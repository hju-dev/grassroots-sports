import { getDb } from '@/lib/db';
import type { GalleryCategory, GalleryPhoto } from '@/lib/gallery-defs';

export type PublicGalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  category: GalleryCategory;
};

// Published photos for the public Gallery page, in the owner's chosen order.
// Returns null when the table can't be read (not created yet, database down) so
// the caller can fall back to the CMS-managed media and the page never breaks.
export async function getPublishedGallery(locale: 'en' | 'th'): Promise<PublicGalleryPhoto[] | null> {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT url, width, height, alt_en, alt_th, caption_en, caption_th, category
      FROM gallery_photos
      WHERE published = true
      ORDER BY sort_order, created_at
    `) as Array<Pick<GalleryPhoto, 'url' | 'width' | 'height' | 'alt_en' | 'alt_th' | 'caption_en' | 'caption_th' | 'category'>>;
    const th = locale === 'th';
    return rows.map((r) => ({
      src: r.url,
      width: r.width,
      height: r.height,
      // Thai text is optional; an empty Thai box means "show the English".
      alt: (th && r.alt_th) || r.alt_en,
      caption: (th && r.caption_th) || r.caption_en,
      category: r.category,
    }));
  } catch (err) {
    console.error('[gallery] using CMS media fallback', err);
    return null;
  }
}

// Every photo, drafts included, for the dashboard editor.
export async function listGalleryForDashboard(): Promise<GalleryPhoto[]> {
  const sql = getDb();
  return (await sql`
    SELECT id, url, width, height, alt_en, alt_th, caption_en, caption_th, category, published, sort_order
    FROM gallery_photos
    ORDER BY sort_order, created_at
  `) as GalleryPhoto[];
}
