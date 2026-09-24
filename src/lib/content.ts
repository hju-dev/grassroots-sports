import { cache } from 'react';
import { getDb } from '@/lib/db';
import { LINK_FIELDS, defaultForContentKey, isContentKey, type LinkKey } from '@/lib/content-defs';

export type PublishedContent = {
  // Message path -> text, per language, for example en["home.headline"].
  en: Record<string, string>;
  th: Record<string, string>;
  links: Partial<Record<LinkKey, string>>;
};

// Published overrides only. If the table can't be read (not created yet,
// database down) this returns no overrides and every page shows its built-in
// wording, so public pages never break. cache() means the translation setup and
// any page that needs a link share one query per request.
export const getPublishedContent = cache(async (): Promise<PublishedContent> => {
  const result: PublishedContent = { en: {}, th: {}, links: {} };
  try {
    const sql = getDb();
    const rows = (await sql`SELECT key, value FROM site_content WHERE value IS NOT NULL`) as Array<{ key: string; value: string }>;
    for (const r of rows) {
      if (!isContentKey(r.key)) continue;
      if (r.key.startsWith('en.')) result.en[r.key.slice(3)] = r.value;
      else if (r.key.startsWith('th.')) result.th[r.key.slice(3)] = r.value;
      else if (r.key.startsWith('link.')) {
        const name = r.key.slice(5) as LinkKey;
        if (LINK_FIELDS.some((l) => l.key === name)) result.links[name] = r.value;
      }
    }
  } catch (err) {
    console.error('[site content] using built-in text', err);
  }
  return result;
});

// Every editable link: the owner's published value, else the built-in one.
export async function getLinks(): Promise<Record<LinkKey, string>> {
  const content = await getPublishedContent();
  return Object.fromEntries(
    LINK_FIELDS.map((l) => [l.key, content.links[l.key] ?? defaultForContentKey('link.' + l.key) ?? l.fallback]),
  ) as Record<LinkKey, string>;
}

// "https://instagram.com/akdovey/" -> "akdovey", for places that show the handle.
export function instagramHandle(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/[/?#].*$/, '') || 'akdovey';
}
