import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAdminEmail } from '@/lib/requireAdmin';
import { getSlotViews } from '@/lib/image-slots';
import type { SlotView } from '@/lib/image-slot-defs';
import { ImageSlotsEditor } from './ImageSlotsEditor';

export const metadata: Metadata = { title: 'Site images' };
export const dynamic = 'force-dynamic';

export default async function ImagesPage() {
  // Re-checked here (not only in the layout) because this page reads private drafts.
  if (!(await getAdminEmail())) notFound();

  let slots: SlotView[];
  try {
    slots = await getSlotViews();
  } catch (err) {
    console.error('[dashboard images]', err);
    return (
      <div className="bg-white rounded-xl border border-[var(--color-black)]/10 p-6 text-sm">
        <p className="font-semibold mb-1">The image editor isn&apos;t set up yet.</p>
        <p className="text-[var(--color-muted)]">
          The <code>image_slots</code> table needs to be created in the database first. The website keeps showing its built-in images in the meantime.
        </p>
      </div>
    );
  }

  return <ImageSlotsEditor initial={slots} />;
}
