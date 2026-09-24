import { cache } from 'react';
import { getDb } from '@/lib/db';
import { IMAGE_SLOTS, type SlotImage, type SlotKey, type SlotView } from '@/lib/image-slot-defs';

type SlotRow = {
  slot: string;
  url: string | null;
  width: number | null;
  height: number | null;
  alt_en: string | null;
  alt_th: string | null;
  draft_url: string | null;
  draft_width: number | null;
  draft_height: number | null;
};

async function readRows(): Promise<SlotRow[]> {
  const sql = getDb();
  return (await sql`
    SELECT slot, url, width, height, alt_en, alt_th, draft_url, draft_width, draft_height
    FROM image_slots
  `) as SlotRow[];
}

// Live image for every slot: the owner's published upload if there is one,
// otherwise the bundled default. If the table can't be read (not created yet,
// database down) every slot quietly uses its default, so public pages never
// break. cache() means the layout and the page share one query per request.
export const getSlotImages = cache(async (locale: 'en' | 'th'): Promise<Record<SlotKey, SlotImage>> => {
  const result = Object.fromEntries(IMAGE_SLOTS.map((s) => [s.key, s.fallback])) as Record<SlotKey, SlotImage>;
  try {
    const rows = await readRows();
    for (const r of rows) {
      const def = IMAGE_SLOTS.find((s) => s.key === r.slot);
      if (!def) continue;
      const live = r.url !== null && r.width !== null && r.height !== null;
      result[def.key] = {
        src: live ? (r.url as string) : def.fallback.src,
        width: live ? (r.width as number) : def.fallback.width,
        height: live ? (r.height as number) : def.fallback.height,
        // An empty Thai description means "show the English one".
        alt: (locale === 'th' && r.alt_th) || r.alt_en || def.fallback.alt,
      };
    }
  } catch (err) {
    console.error('[image slots] using bundled images', err);
  }
  return result;
});

// Everything the dashboard needs, including unpublished drafts. Throws if the
// table can't be read so the page can show a plain "not set up" message.
export async function getSlotViews(): Promise<SlotView[]> {
  const rows = await readRows();
  return IMAGE_SLOTS.map((def) => {
    const r = rows.find((row) => row.slot === def.key);
    const live = !!r && r.url !== null && r.width !== null && r.height !== null;
    return {
      key: def.key,
      current: live
        ? { src: r!.url as string, width: r!.width as number, height: r!.height as number }
        : { src: def.fallback.src, width: def.fallback.width, height: def.fallback.height },
      alt_en: r?.alt_en ?? def.fallback.alt,
      alt_th: r?.alt_th ?? '',
      isCustom: live,
      draft:
        r && r.draft_url !== null && r.draft_width !== null && r.draft_height !== null
          ? { url: r.draft_url, width: r.draft_width, height: r.draft_height }
          : null,
    };
  });
}
