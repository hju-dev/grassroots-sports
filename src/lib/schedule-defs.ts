// The weekly schedule shown on the public Schedule page. Plain data with no
// server imports, so the dashboard's client editor and the server can share it.

export const SCHEDULE_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type ScheduleDay = (typeof SCHEDULE_DAYS)[number];

export const SCHEDULE_PROGRAMS = ['youth', 'teen', 'adult', 'private', 'clinic'] as const;
export type ScheduleProgram = (typeof SCHEDULE_PROGRAMS)[number];

export const SCHEDULE_PROGRAM_LABELS: Record<ScheduleProgram, string> = {
  youth: 'Youth Basketball',
  teen: 'Teen Academy',
  adult: 'Adult Leagues',
  private: 'Private Coaching',
  clinic: 'Skills Clinic',
};

export const SCHEDULE_DAY_LABELS: Record<ScheduleDay, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

// time is free text such as "4:00 to 5:30 PM". Empty means "Time TBC" (or
// "By Appointment" for private coaching), exactly as the site shows today.
export type ScheduleSlot = { program: ScheduleProgram; time: string };
export type ScheduleWeek = Record<ScheduleDay, ScheduleSlot[]>;

export const SCHEDULE_TIME_MAX = 40;
export const SCHEDULE_SLOTS_PER_DAY_MAX = 8;

const s = (program: ScheduleProgram): ScheduleSlot => ({ program, time: '' });

// The planned week that ships with the site. It is what the public page shows
// until the owner saves a schedule, and again after "Restore planned schedule".
export const DEFAULT_WEEK: ScheduleWeek = {
  mon: [s('youth'), s('teen')],
  tue: [s('private')],
  wed: [s('youth'), s('teen'), s('adult')],
  thu: [s('private')],
  fri: [s('teen'), s('adult')],
  sat: [s('youth'), s('clinic'), s('private')],
  sun: [],
};
