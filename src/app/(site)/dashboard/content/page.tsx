import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAdminEmail } from '@/lib/requireAdmin';
import { getDb } from '@/lib/db';
import { isContentKey } from '@/lib/content-defs';
import { ContentEditor } from './ContentEditor';

export const metadata: Metadata = { title: 'Text & links' };
export const dynamic = 'force-dynamic';

export default async function ContentPage() {
  // Re-checked here (not only in the layout) because this page reads private drafts.
  if (!(await getAdminEmail())) notFound();

  let rows: Array<{ key: string; value: string | null; draft_value: string | null }>;
  try {
    const sql = getDb();
    rows = (await sql`SELECT key, value, draft_value FROM site_content`) as typeof rows;
  } catch (err) {
    console.error('[dashboard content]', err);
    return (
      <div className="bg-white rounded-xl border border-[var(--color-black)]/10 p-6 text-sm">
        <p className="font-semibold mb-1">Text and links aren&apos;t set up yet.</p>
        <p className="text-[var(--color-muted)]">
          The <code>site_content</code> table needs to be created in the database first. The website keeps showing its built-in text in the meantime.
        </p>
      </div>
    );
  }

  const live: Record<string, string> = {};
  const draft: Record<string, string> = {};
  for (const r of rows) {
    if (!isContentKey(r.key)) continue;
    if (r.value !== null) live[r.key] = r.value;
    if (r.draft_value !== null) draft[r.key] = r.draft_value;
  }

  return <ContentEditor initialLive={live} initialDraft={draft} />;
}
