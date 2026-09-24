import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAdminEmail } from '@/lib/requireAdmin';
import { getDb } from '@/lib/db';
import { DEFAULT_WEEK } from '@/lib/schedule-defs';
import { parseSchedule } from '@/lib/schedule-validate';
import { ScheduleEditor } from './ScheduleEditor';

export const metadata: Metadata = { title: 'Schedule' };
export const dynamic = 'force-dynamic';

export default async function SchedulePage() {
  // Re-checked here (not only in the layout) so this page never loads for a non-admin.
  if (!(await getAdminEmail())) notFound();

  let stored: string | null = null;
  try {
    const sql = getDb();
    const rows = (await sql`SELECT value FROM site_settings WHERE key = 'schedule'`) as Array<{ value: string }>;
    stored = rows[0]?.value ?? null;
  } catch (err) {
    console.error('[dashboard schedule]', err);
    return (
      <div className="bg-white rounded-xl border border-[var(--color-black)]/10 p-6 text-sm">
        <p className="font-semibold mb-1">The schedule editor isn&apos;t set up yet.</p>
        <p className="text-[var(--color-muted)]">
          The <code>site_settings</code> table needs to be created in the database first. The website keeps showing its planned schedule in the meantime.
        </p>
      </div>
    );
  }

  let week = DEFAULT_WEEK;
  let isCustom = false;
  if (stored) {
    try {
      const parsed = parseSchedule(JSON.parse(stored));
      if (parsed.ok) { week = parsed.week; isCustom = true; }
    } catch {
      // an unreadable saved schedule falls back to the planned week, like the public page
    }
  }

  return <ScheduleEditor initialWeek={week} initialIsCustom={isCustom} />;
}
