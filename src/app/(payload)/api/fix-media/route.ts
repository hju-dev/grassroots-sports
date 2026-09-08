import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

// TEMPORARY fix-it route — delete once the migration below has been run
// once successfully. Requires an authenticated Payload admin session (same
// auth as /admin itself).
//
// Root cause: the Media docs currently in the DB were seeded before
// BLOB_READ_WRITE_TOKEN was live in the production deployment. At that
// moment the storage-vercel-blob plugin silently disabled itself (it does
// this whenever `token` is falsy — see
// node_modules/@payloadcms/storage-vercel-blob/dist/index.js), so those
// docs got local-disk-style `url` values (`/api/media/file/<name>`) baked
// in permanently. The token is correctly configured now, but nobody
// re-created those specific documents since — so they still 404/400 in
// production. The Media collection also picked up unrelated seed/test rows
// (seasonal-pumpkin.jpg etc.) along the way, which the public Gallery page
// renders indiscriminately (no filter beyond `sort: -createdAt`).
//
// This route deletes all existing (broken/junk) Media docs and recreates
// the real ones through Payload's actual Local API upload pipeline, which
// invokes the Blob adapter's handleUpload and produces a genuine
// *.public.blob.vercel-storage.com url.
const REAL_PHOTOS = [
  { filename: 'team-dinner.webp', alt: 'Team community dinner', caption: 'Team dinner', category: 'events' },
  { filename: 'community-group.webp', alt: 'Grassroots Sports community group photo', caption: 'Community', category: 'events' },
  { filename: 'team-champions.webp', alt: 'Girls team celebrating championship win', caption: 'Champions', category: 'youth' },
  { filename: 'youth-scrimmage.webp', alt: 'Youth scrimmage session', caption: 'Youth scrimmage', category: 'youth' },
  { filename: 'team-timeout.webp', alt: 'Team timeout during a game', caption: 'Game time', category: 'adult' },
  { filename: 'coach-huddle.webp', alt: 'Coach and players in huddle', caption: 'Coaching session', category: 'youth' },
  { filename: 'game-action.webp', alt: 'Grassroots Sports game action', caption: 'Game action', category: 'adult' },
  { filename: 'team-huddle.webp', alt: 'Grassroots Sports team huddle', caption: 'Team huddle', category: 'events' },
] as const;

export async function POST(req: NextRequest) {
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const origin = new URL(req.url).origin;
  const results: Array<Record<string, unknown>> = [];

  const existing = await payload.find({ collection: 'media', limit: 100, depth: 0 });
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'media', id: doc.id });
    results.push({ deleted: doc.filename ?? doc.id });
  }

  for (const photo of REAL_PHOTOS) {
    const res = await fetch(`${origin}/images/${photo.filename}`);
    if (!res.ok) {
      results.push({ failed: photo.filename, fetchStatus: res.status });
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    try {
      const doc = await payload.create({
        collection: 'media',
        data: { alt: photo.alt, caption: photo.caption, category: photo.category },
        file: {
          data: buffer,
          mimetype: 'image/webp',
          name: photo.filename,
          size: buffer.length,
        },
      });
      results.push({ created: photo.filename, url: doc.url });
    } catch (err) {
      results.push({ failed: photo.filename, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return NextResponse.json({ results });
}
