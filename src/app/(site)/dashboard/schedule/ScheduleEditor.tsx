'use client';

import { useState } from 'react';
import { saveSchedule, resetSchedule } from '../actions';
import {
  DEFAULT_WEEK,
  SCHEDULE_DAYS,
  SCHEDULE_DAY_LABELS,
  SCHEDULE_PROGRAMS,
  SCHEDULE_PROGRAM_LABELS,
  SCHEDULE_SLOTS_PER_DAY_MAX,
  SCHEDULE_TIME_MAX,
  type ScheduleDay,
  type ScheduleProgram,
  type ScheduleWeek,
} from '@/lib/schedule-defs';

const STEPS = [
  { title: 'Find the day', body: 'Each card is one day of the week. A day with no classes shows "Closed" on the website.' },
  { title: 'Add or remove classes', body: 'Press "Add class" and pick the program. Use × to remove one, and ↑ ↓ to change the order.' },
  { title: 'Type the time', body: 'For example "4:00 to 5:30 PM". Leave it empty to show "Time TBC" (or "By Appointment" for private coaching).' },
  { title: 'Save', body: 'Press "Save schedule". It shows on the Schedule page within about a minute.' },
];

const same = (a: ScheduleWeek, b: ScheduleWeek) => JSON.stringify(a) === JSON.stringify(b);

export function ScheduleEditor({ initialWeek, initialIsCustom }: { initialWeek: ScheduleWeek; initialIsCustom: boolean }) {
  const [week, setWeek] = useState<ScheduleWeek>(initialWeek);
  const [saved, setSaved] = useState<ScheduleWeek>(initialWeek);
  const [isCustom, setIsCustom] = useState(initialIsCustom);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const unsaved = !same(week, saved);

  function edit(day: ScheduleDay, fn: (slots: ScheduleWeek[ScheduleDay]) => ScheduleWeek[ScheduleDay]) {
    setWeek((prev) => ({ ...prev, [day]: fn(prev[day]) }));
    setStatus(null);
  }

  async function save() {
    setBusy(true);
    setStatus(null);
    try {
      const result = await saveSchedule(week);
      if (result.error) setStatus({ ok: false, text: result.error });
      else {
        setSaved(week);
        setIsCustom(true);
        setStatus({ ok: true, text: '✓ Saved. It will appear on the website within about a minute.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, text: "That didn't save. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  // Confirmed inline rather than with window.confirm, which some browsers block.
  async function restore() {
    setConfirmReset(false);
    setBusy(true);
    setStatus(null);
    try {
      await resetSchedule();
      setWeek(DEFAULT_WEEK);
      setSaved(DEFAULT_WEEK);
      setIsCustom(false);
      setStatus({ ok: true, text: '✓ The planned schedule is back on the website.' });
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, text: "That didn't save. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  const field = 'px-2 py-1.5 border border-[var(--color-black)]/15 rounded text-sm text-[var(--color-black)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]/50';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-black)]">Schedule</h1>
        <p className="text-sm text-[var(--color-muted)]">
          The weekly program schedule on the website&apos;s Schedule page. {isCustom ? 'You are showing your own schedule.' : 'You are showing the planned schedule that came with the website.'} The words around it (title, notes) are in the Text &amp; links tab.
        </p>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="bg-white rounded-xl border border-[var(--color-black)]/10 p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-[var(--color-lime)] text-[var(--color-black)] text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <span className="text-sm font-semibold text-[var(--color-black)]">{s.title}</span>
            </div>
            <p className="text-xs text-[var(--color-muted)] leading-snug">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="bg-white rounded-xl border border-[var(--color-black)]/10 p-4 flex flex-wrap items-center gap-3 sticky top-[68px] z-10">
        <p className="flex-1 min-w-[200px] text-xs text-[var(--color-muted)]">
          {unsaved ? 'You have changes that are not saved yet.' : 'Everything here matches the website.'}{' '}
          <a href="/en/schedule" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-black)]">View the Schedule page</a>
        </p>
        <button
          type="button"
          disabled={busy || !unsaved}
          onClick={save}
          className="min-h-11 px-5 rounded-full text-sm font-semibold bg-[var(--color-forest)] text-white hover:bg-[var(--color-lime)] hover:text-[var(--color-black)] disabled:opacity-40"
        >
          Save schedule
        </button>
        {unsaved && (
          <button
            type="button"
            disabled={busy}
            onClick={() => { setWeek(saved); setStatus(null); }}
            className="min-h-11 px-3 text-xs font-semibold text-[var(--color-muted)] hover:text-red-700 disabled:opacity-40"
          >
            Discard changes
          </button>
        )}
      </div>

      <div aria-live="polite" className="min-h-5">
        {status && <p className={`text-sm font-semibold ${status.ok ? 'text-[var(--color-forest)]' : 'text-red-700'}`}>{status.text}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SCHEDULE_DAYS.map((day) => {
          const slots = week[day];
          return (
            <section key={day} className="bg-white rounded-xl border border-[var(--color-black)]/10 p-4 space-y-3">
              <h2 className="text-sm font-bold text-[var(--color-black)]">{SCHEDULE_DAY_LABELS[day]}</h2>
              {slots.length === 0 && <p className="text-xs italic text-[var(--color-muted)]">No classes. Shows &quot;Closed&quot; on the website.</p>}
              <ul className="space-y-2">
                {slots.map((slot, i) => (
                  <li key={i} className="rounded-lg bg-[var(--color-sage)] p-2 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <label className="flex-1 min-w-0">
                        <span className="sr-only">Program</span>
                        <select
                          value={slot.program}
                          onChange={(e) => edit(day, (s) => s.map((x, j) => (j === i ? { ...x, program: e.target.value as ScheduleProgram } : x)))}
                          className={`${field} w-full`}
                        >
                          {SCHEDULE_PROGRAMS.map((p) => (
                            <option key={p} value={p}>{SCHEDULE_PROGRAM_LABELS[p]}</option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        aria-label="Move up"
                        title="Move up"
                        disabled={i === 0}
                        onClick={() => edit(day, (s) => { const n = [...s]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return n; })}
                        className="w-11 h-11 rounded-full border border-[var(--color-black)]/20 hover:border-[var(--color-forest)] disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        aria-label="Move down"
                        title="Move down"
                        disabled={i === slots.length - 1}
                        onClick={() => edit(day, (s) => { const n = [...s]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; return n; })}
                        className="w-11 h-11 rounded-full border border-[var(--color-black)]/20 hover:border-[var(--color-forest)] disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        aria-label="Remove class"
                        title="Remove class"
                        onClick={() => edit(day, (s) => s.filter((_, j) => j !== i))}
                        className="w-11 h-11 rounded-full text-[var(--color-muted)] hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                    <label className="block">
                      <span className="sr-only">Time</span>
                      <input
                        value={slot.time}
                        maxLength={SCHEDULE_TIME_MAX}
                        placeholder={slot.program === 'private' ? 'Empty shows "By Appointment"' : 'Empty shows "Time TBC"'}
                        onChange={(e) => edit(day, (s) => s.map((x, j) => (j === i ? { ...x, time: e.target.value } : x)))}
                        className={`${field} w-full`}
                      />
                    </label>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={slots.length >= SCHEDULE_SLOTS_PER_DAY_MAX}
                onClick={() => edit(day, (s) => [...s, { program: 'youth', time: '' }])}
                className="min-h-11 px-4 rounded-full text-xs font-semibold border border-[var(--color-black)]/25 hover:border-[var(--color-forest)] disabled:opacity-40"
              >
                + Add class
              </button>
            </section>
          );
        })}
      </div>

      <div className="pt-2 border-t border-[var(--color-black)]/10">
        {confirmReset ? (
          <span className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-black)]">
            Put the planned schedule that came with the website back? This changes the website right away.
            <button type="button" disabled={busy} onClick={restore} className="min-h-11 px-3 rounded-full font-semibold bg-red-700 text-white disabled:opacity-50">
              Yes, restore
            </button>
            <button type="button" onClick={() => setConfirmReset(false)} className="min-h-11 px-3 rounded-full font-semibold border border-[var(--color-black)]/25 hover:border-[var(--color-forest)]">
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            disabled={busy || (!isCustom && !unsaved)}
            onClick={() => setConfirmReset(true)}
            className="min-h-11 text-xs font-semibold text-[var(--color-muted)] hover:text-red-700 disabled:opacity-40"
          >
            Restore planned schedule
          </button>
        )}
      </div>
    </div>
  );
}
