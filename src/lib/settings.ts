import { cache } from 'react';
import { getDb } from '@/lib/db';
import { DEFAULT_WEEK, type ScheduleWeek } from '@/lib/schedule-defs';
import { parseSchedule } from '@/lib/schedule-validate';

// Small owner-controlled settings, stored as key/value rows in site_settings:
//   registrations_open  "true" | "false"
//   schedule            the weekly schedule as JSON
// A row only exists once the owner changes something. If the table can't be
// read (not created yet, database down) the built-in defaults apply, so public
// pages never break: registrations stay open and the planned schedule shows.
const readAll = cache(async (): Promise<Record<string, string>> => {
  try {
    const sql = getDb();
    const rows = (await sql`SELECT key, value FROM site_settings`) as Array<{ key: string; value: string }>;
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch (err) {
    console.error('[site settings] using defaults', err);
    return {};
  }
});

export async function getRegistrationsOpen(): Promise<boolean> {
  const all = await readAll();
  return all['registrations_open'] !== 'false';
}

export async function getSchedule(): Promise<{ week: ScheduleWeek; isCustom: boolean }> {
  const raw = (await readAll())['schedule'];
  if (raw) {
    try {
      const parsed = parseSchedule(JSON.parse(raw));
      if (parsed.ok) return { week: parsed.week, isCustom: true };
    } catch {
      // fall through to the built-in week
    }
    console.error('[site settings] stored schedule is invalid, using the planned week');
  }
  return { week: DEFAULT_WEEK, isCustom: false };
}
