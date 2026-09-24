import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAdminEmail } from '@/lib/requireAdmin';
import { listGalleryForDashboard } from '@/lib/gallery';
import type { GalleryPhoto } from '@/lib/gallery-defs';
import { GalleryEditor } from './GalleryEditor';

export const metadata: Metadata = { title: 'Gallery' };
export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  // Re-checked here (not only in the layout) because this page reads private drafts.
  if (!(await getAdminEmail())) notFound();

  let photos: GalleryPhoto[];
  try {
    photos = await listGalleryForDashboard();
  } catch (err) {
    console.error('[dashboard gallery]', err);
    return (
      <div className="bg-white rounded-xl border border-[var(--color-black)]/10 p-6 text-sm">
        <p className="font-semibold mb-1">The gallery editor isn&apos;t set up yet.</p>
        <p className="text-[var(--color-muted)]">
          The <code>gallery_photos</code> table needs to be created in the database first. The public Gallery page keeps working in the meantime.
        </p>
      </div>
    );
  }

  return <GalleryEditor initial={photos} />;
}
