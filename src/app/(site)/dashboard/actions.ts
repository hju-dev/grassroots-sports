'use server';

import { revalidatePath } from 'next/cache';
import { put, del } from '@vercel/blob';
import { getDb } from '@/lib/db';
import { assertAdmin } from '@/lib/requireAdmin';
import { encodeUpload } from '@/lib/image-encode';
import type { GalleryPhoto, GalleryTextField } from '@/lib/gallery-defs';
import {
  cleanGalleryText,
  galleryCategorySchema,
  galleryIdSchema,
  galleryIdsSchema,
  galleryTextFieldSchema,
} from '@/lib/gallery-validate';

// Every action below starts with assertAdmin(): being signed in is not enough,
// the caller must be on the ADMIN_EMAILS allowlist (fails closed if unset).

function revalidateGallery() {
  revalidatePath('/dashboard/gallery');
  revalidatePath('/en/gallery');
  revalidatePath('/th/gallery');
}

// Uploads land as drafts: they're saved but stay off the public Gallery until
// the owner presses Publish, so a half-finished batch never goes live by accident.
export async function uploadGalleryPhoto(formData: FormData): Promise<{ photo: GalleryPhoto } | { error: string }> {
  await assertAdmin();

  const encoded = await encodeUpload(formData, 'gallery upload');
  if ('error' in encoded) return encoded;

  let blobUrl: string;
  try {
    const blob = await put(`gallery/${crypto.randomUUID()}.webp`, encoded.webp, {
      access: 'public',
      contentType: 'image/webp',
    });
    blobUrl = blob.url;
  } catch (err) {
    console.error('[gallery upload] storage failed', err);
    return { error: "The photo couldn't be stored. Please try again." };
  }

  const sql = getDb();
  const [maxRow] = await sql`SELECT COALESCE(MAX(sort_order), 0) AS max FROM gallery_photos`;
  const [row] = await sql`
    INSERT INTO gallery_photos (url, width, height, published, sort_order)
    VALUES (${blobUrl}, ${encoded.width}, ${encoded.height}, false, ${(maxRow.max as number) + 1})
    RETURNING id, url, width, height, alt_en, alt_th, caption_en, caption_th, category, published, sort_order
  `;

  revalidatePath('/dashboard/gallery');
  return { photo: row as GalleryPhoto };
}

export async function updateGalleryText(id: string, field: GalleryTextField, value: string): Promise<{ error?: string }> {
  await assertAdmin();
  const safeId = galleryIdSchema.parse(id);
  const safeField = galleryTextFieldSchema.parse(field);
  let text: string;
  try {
    text = cleanGalleryText(safeField, value);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Invalid text' };
  }

  const sql = getDb();
  // Column names can't be parameters, so each allowed field has its own fixed statement.
  switch (safeField) {
    case 'alt_en': await sql`UPDATE gallery_photos SET alt_en = ${text} WHERE id = ${safeId}`; break;
    case 'alt_th': await sql`UPDATE gallery_photos SET alt_th = ${text} WHERE id = ${safeId}`; break;
    case 'caption_en': await sql`UPDATE gallery_photos SET caption_en = ${text} WHERE id = ${safeId}`; break;
    case 'caption_th': await sql`UPDATE gallery_photos SET caption_th = ${text} WHERE id = ${safeId}`; break;
  }
  revalidateGallery();
  return {};
}

export async function updateGalleryCategory(id: string, category: string): Promise<void> {
  await assertAdmin();
  const safeId = galleryIdSchema.parse(id);
  const safeCategory = galleryCategorySchema.parse(category);

  const sql = getDb();
  await sql`UPDATE gallery_photos SET category = ${safeCategory} WHERE id = ${safeId}`;
  revalidateGallery();
}

// A photo needs an English description before it can go live (screen readers
// and Google rely on it). Unpublishing is always allowed.
export async function setGalleryPublished(ids: string[], published: boolean): Promise<{ error?: string; blocked?: string[] }> {
  await assertAdmin();
  const safeIds = galleryIdsSchema.parse(ids);
  if (safeIds.length === 0) return {};

  const sql = getDb();
  if (published) {
    const missing = (await sql`
      SELECT id FROM gallery_photos WHERE id = ANY(${safeIds}::uuid[]) AND alt_en = ''
    `) as Array<{ id: string }>;
    if (missing.length > 0) {
      return {
        error: 'Add a short description to every photo before publishing it.',
        blocked: missing.map((m) => m.id),
      };
    }
  }

  await sql`UPDATE gallery_photos SET published = ${published} WHERE id = ANY(${safeIds}::uuid[])`;
  revalidateGallery();
  return {};
}

export async function reorderGalleryPhotos(orderedIds: string[]): Promise<void> {
  await assertAdmin();
  const safeIds = galleryIdsSchema.parse(orderedIds);
  if (safeIds.length === 0) return;

  const sql = getDb();
  await sql`
    UPDATE gallery_photos AS g
    SET sort_order = v.ord
    FROM unnest(${safeIds}::uuid[]) WITH ORDINALITY AS v(id, ord)
    WHERE g.id = v.id
  `;
  revalidateGallery();
}

export async function deleteGalleryPhoto(id: string): Promise<void> {
  await assertAdmin();
  const safeId = galleryIdSchema.parse(id);

  const sql = getDb();
  const [row] = await sql`DELETE FROM gallery_photos WHERE id = ${safeId} RETURNING url`;
  // Only remove the file when this dashboard uploaded it (stored under gallery/).
  // Photos carried over from the old media library are just un-listed, since the
  // CMS media library may still reference the same file.
  if (row?.url && typeof row.url === 'string' && row.url.startsWith('https://') && row.url.includes('/gallery/')) {
    try {
      await del(row.url);
    } catch (err) {
      console.error('[gallery blob delete]', err);
    }
  }
  revalidateGallery();
}
