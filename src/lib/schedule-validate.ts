import { z } from 'zod';
import {
  SCHEDULE_DAYS,
  SCHEDULE_PROGRAMS,
  SCHEDULE_SLOTS_PER_DAY_MAX,
  SCHEDULE_TIME_MAX,
  type ScheduleWeek,
} from './schedule-defs';

// Control characters and line breaks never belong in a time label.
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const cleanTime = (v: string) => v.replace(CONTROL_CHARS, ' ').replace(/\s+/g, ' ').trim();

const slotSchema = z.object({
  program: z.enum(SCHEDULE_PROGRAMS),
  time: z
    .string()
    .transform(cleanTime)
    .refine((t) => t.length <= SCHEDULE_TIME_MAX, `Times can be at most ${SCHEDULE_TIME_MAX} characters.`)
    // The translation system treats braces and angle brackets as code.
    .refine((t) => !/[{}<>]/.test(t), 'Curly brackets and < > signs are not allowed.'),
}).strict();

const daySchema = z.array(slotSchema).max(SCHEDULE_SLOTS_PER_DAY_MAX, `At most ${SCHEDULE_SLOTS_PER_DAY_MAX} classes per day.`);

// Exactly the seven known days, nothing else (unknown keys are rejected, which
// also rules out "__proto__" and friends).
export const scheduleSchema = z.object(
  Object.fromEntries(SCHEDULE_DAYS.map((d) => [d, daySchema])) as Record<(typeof SCHEDULE_DAYS)[number], typeof daySchema>,
).strict();

export function parseSchedule(input: unknown): { ok: true; week: ScheduleWeek } | { ok: false; error: string } {
  const r = scheduleSchema.safeParse(input);
  if (!r.success) return { ok: false, error: r.error.issues[0]?.message ?? 'Invalid schedule.' };
  return { ok: true, week: r.data as ScheduleWeek };
}
