'use client';

import { useState } from 'react';
import { saveContentDraft, publishContent, discardContentDrafts, resetContent } from '../actions';
import {
  CONTENT_FIELDS,
  CONTENT_PAGES,
  LINK_FIELDS,
  TEXT_MAX,
  cleanContentValue,
  defaultForContentKey,
  fieldStorageKeys,
  type ContentPage,
} from '@/lib/content-defs';

type TabId = ContentPage | 'Links';
const TABS: TabId[] = [...CONTENT_PAGES, 'Links'];

const PAGE_URL: Record<TabId, string> = {
  Home: '/en',
  About: '/en/about',
  Programs: '/en/programs',
  'Program pages': '/en/programs/youth',
  Contact: '/en/contact',
  Register: '/en/register',
  Gallery: '/en/gallery',
  Schedule: '/en/schedule',
  Partners: '/en/partners',
  'Menus & footer': '/en',
  Links: '/en',
};

const STEPS = [
  { title: 'Pick a page', body: 'Choose a tab below. Each tab is one part of the website.' },
  { title: 'Change the words', body: 'Type in the English box, and the Thai box for visitors who switch to Thai. Leave a box alone to keep it as it is.' },
  { title: 'Save a draft (optional)', body: 'A draft keeps your work safe, but visitors do not see it. You can come back to it later.' },
  { title: 'Publish', body: 'Press "Publish" to put your changes on the website. They appear within about a minute.' },
];

function keysForTab(tab: TabId): string[] {
  if (tab === 'Links') return LINK_FIELDS.map((l) => 'link.' + l.key);
  return CONTENT_FIELDS.filter((f) => f.page === tab).flatMap(fieldStorageKeys);
}

const dflt = (key: string) => defaultForContentKey(key) ?? '';

type Status = { tab: TabId; ok: boolean; text: string } | null;

function TextBox({
  label, value, long, error, isOriginal, onChange, onReset,
}: {
  label: string;
  value: string;
  long: boolean;
  error?: string;
  isOriginal: boolean;
  onChange: (v: string) => void;
  onReset: () => void;
}) {
  const cls = `w-full px-2 py-1.5 border rounded text-sm text-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]/50 ${error ? 'border-red-600' : 'border-[var(--color-black)]/15'}`;
  return (
    <label className="block">
      <span className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]">{label}</span>
        {!isOriginal && (
          <button type="button" onClick={onReset} className="min-h-6 text-[11px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-black)] underline">
            Reset to original
          </button>
        )}
      </span>
      {long ? (
        <textarea value={value} rows={4} maxLength={TEXT_MAX + 200} onChange={(e) => onChange(e.target.value)} className={`${cls} mt-1 resize-y`} />
      ) : (
        <input value={value} maxLength={TEXT_MAX + 200} onChange={(e) => onChange(e.target.value)} className={`${cls} mt-1`} />
      )}
      {error && <span className="block text-xs font-semibold text-red-700 mt-0.5">{error}</span>}
    </label>
  );
}

export function ContentEditor({
  initialLive,
  initialDraft,
}: {
  initialLive: Record<string, string>;
  initialDraft: Record<string, string>;
}) {
  const [live, setLive] = useState(initialLive);
  const [draft, setDraft] = useState(initialDraft);
  const [form, setForm] = useState<Record<string, string>>(() => {
    const f: Record<string, string> = {};
    for (const tab of TABS) for (const k of keysForTab(tab)) f[k] = initialDraft[k] ?? initialLive[k] ?? dflt(k);
    return f;
  });
  const [tab, setTab] = useState<TabId>('Home');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const effectiveLive = (k: string) => live[k] ?? dflt(k);
  const notPublished = (t: TabId) => keysForTab(t).filter((k) => form[k] !== effectiveLive(k)).length;
  const unsaved = (t: TabId) => keysForTab(t).filter((k) => form[k] !== (draft[k] ?? effectiveLive(k))).length;

  const keys = keysForTab(tab);
  const pending = notPublished(tab);

  // Validates the whole tab up front so problems show next to the field they belong to.
  function validateTab(): Record<string, string> | null {
    const problems: Record<string, string> = {};
    const cleaned: Record<string, string> = {};
    for (const k of keys) {
      const r = cleanContentValue(k, form[k]);
      if (r.ok) cleaned[k] = r.value;
      else problems[k] = r.error;
    }
    if (Object.keys(problems).length > 0) {
      setErrors(problems);
      setStatus({ tab, ok: false, text: 'Some fields need fixing. They are marked in red.' });
      return null;
    }
    setErrors({});
    return cleaned;
  }

  async function run(work: () => Promise<string | void>, okText: string) {
    setBusy(true);
    setStatus(null);
    try {
      const problem = await work();
      setStatus({ tab, ok: !problem, text: problem || okText });
    } catch (err) {
      console.error(err);
      setStatus({ tab, ok: false, text: "That didn't save. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  function handleServerResult(res: { error?: string; field?: string }): string | void {
    if (res.error) {
      if (res.field) setErrors({ [res.field]: res.error });
      return res.error;
    }
  }

  function saveDraft() {
    const cleaned = validateTab();
    if (!cleaned) return;
    run(async () => {
      const problem = handleServerResult(await saveContentDraft(cleaned));
      if (problem) return problem;
      setForm((prev) => ({ ...prev, ...cleaned }));
      setDraft((prev) => {
        const next = { ...prev };
        for (const [k, v] of Object.entries(cleaned)) {
          if (v === effectiveLive(k)) delete next[k];
          else next[k] = v;
        }
        return next;
      });
    }, '✓ Draft saved. Visitors do not see it until you press Publish.');
  }

  function publish() {
    const cleaned = validateTab();
    if (!cleaned) return;
    run(async () => {
      const problem = handleServerResult(await publishContent(cleaned));
      if (problem) return problem;
      setForm((prev) => ({ ...prev, ...cleaned }));
      setLive((prev) => {
        const next = { ...prev };
        for (const [k, v] of Object.entries(cleaned)) {
          if (v === dflt(k)) delete next[k];
          else next[k] = v;
        }
        return next;
      });
      setDraft((prev) => {
        const next = { ...prev };
        for (const k of Object.keys(cleaned)) delete next[k];
        return next;
      });
    }, '✓ Published. It will appear on the website within about a minute.');
  }

  function discard() {
    run(async () => {
      await discardContentDrafts(keys);
      setDraft((prev) => {
        const next = { ...prev };
        for (const k of keys) delete next[k];
        return next;
      });
      setForm((prev) => {
        const next = { ...prev };
        for (const k of keys) next[k] = effectiveLive(k);
        return next;
      });
      setErrors({});
    }, '✓ Changes discarded. The fields show what is on the website now.');
  }

  // Confirmed inline rather than with window.confirm, which some browsers block.
  function restoreOriginal() {
    setConfirmReset(false);
    run(async () => {
      await resetContent(keys);
      setLive((prev) => {
        const next = { ...prev };
        for (const k of keys) delete next[k];
        return next;
      });
      setDraft((prev) => {
        const next = { ...prev };
        for (const k of keys) delete next[k];
        return next;
      });
      setForm((prev) => {
        const next = { ...prev };
        for (const k of keys) next[k] = dflt(k);
        return next;
      });
      setErrors({});
    }, '✓ Original text restored on the website.');
  }

  const set = (k: string, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => { const n = { ...prev }; delete n[k]; return n; });
  };

  const tabFields = tab === 'Links' ? [] : CONTENT_FIELDS.filter((f) => f.page === tab);
  const groups = Array.from(new Set(tabFields.map((f) => f.group)));
  // Long tabs start with their sections closed so the page stays easy to scan.
  const openByDefault = groups.length <= 12;

  const badge = <span className="text-[10px] font-bold uppercase bg-amber-300 text-[var(--color-black)] px-2 py-0.5 rounded-full">Not published</span>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-black)]">Text &amp; links</h1>
        <p className="text-sm text-[var(--color-muted)]">Change the words and links on the website. Pictures are in the Images and Gallery tabs.</p>
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

      <div role="tablist" aria-label="Website pages" className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const changed = notPublished(t) > 0;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => { setTab(t); setStatus(null); setErrors({}); setConfirmReset(false); }}
              className={`min-h-11 px-4 rounded-full text-sm font-semibold transition-colors ${
                tab === t
                  ? 'bg-[var(--color-lime)] text-[var(--color-black)] shadow-sm'
                  : 'bg-white border border-[var(--color-black)]/15 text-[var(--color-black)] hover:border-[var(--color-forest)]'
              }`}
            >
              {t}
              {changed && <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-amber-500" title="Has changes that are not published" />}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-[var(--color-black)]/10 p-4 flex flex-wrap items-center gap-3 sticky top-[68px] z-10">
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm font-semibold text-[var(--color-black)]">{tab === 'Links' ? 'Links' : tab}</p>
          <p className="text-xs text-[var(--color-muted)]">
            {pending > 0
              ? `${pending} field${pending === 1 ? '' : 's'} changed, not published yet.`
              : 'Everything here matches the website.'}
            {unsaved(tab) > 0 && ' You have edits that are not saved yet.'}{' '}
            <a href={PAGE_URL[tab]} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-black)]">View this page</a>
          </p>
        </div>
        <button
          type="button"
          disabled={busy || unsaved(tab) === 0}
          onClick={saveDraft}
          className="min-h-11 px-4 rounded-full text-sm font-semibold border border-[var(--color-black)]/25 hover:border-[var(--color-forest)] disabled:opacity-40"
        >
          Save draft
        </button>
        <button
          type="button"
          disabled={busy || pending === 0}
          onClick={publish}
          className="min-h-11 px-4 rounded-full text-sm font-semibold bg-[var(--color-forest)] text-white hover:bg-[var(--color-lime)] hover:text-[var(--color-black)] disabled:opacity-40"
        >
          Publish
        </button>
        {pending > 0 && (
          <button
            type="button"
            disabled={busy}
            onClick={discard}
            className="min-h-11 px-3 text-xs font-semibold text-[var(--color-muted)] hover:text-red-700 disabled:opacity-40"
          >
            Discard changes
          </button>
        )}
      </div>

      <div aria-live="polite" className="min-h-5">
        {status && status.tab === tab && (
          <p className={`text-sm font-semibold ${status.ok ? 'text-[var(--color-forest)]' : 'text-red-700'}`}>{status.text}</p>
        )}
      </div>

      {tab === 'Register' && (
        <p className="text-xs text-[var(--color-muted)] -mt-3">
          The PromptPay payment step and its wording are not editable here.
        </p>
      )}
      {tab === 'Programs' && (
        <p className="text-xs text-[var(--color-muted)] -mt-3">
          The answer about how to pay is not editable here. Each program&apos;s own page is in the &quot;Program pages&quot; tab.
        </p>
      )}

      {tab === 'Links' ? (
        <div className="space-y-4">
          {LINK_FIELDS.map((l) => {
            const k = 'link.' + l.key;
            return (
              <div key={k} className="bg-white rounded-xl border border-[var(--color-black)]/10 p-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[var(--color-black)]">{l.label}</h3>
                  {form[k] !== effectiveLive(k) && badge}
                </div>
                <p className="text-xs text-[var(--color-muted)] mb-2">{l.hint}</p>
                <TextBox
                  label={l.kind === 'email' ? 'Email address' : 'Web address'}
                  value={form[k]}
                  long={false}
                  error={errors[k]}
                  isOriginal={form[k] === dflt(k)}
                  onChange={(v) => set(k, v)}
                  onReset={() => set(k, dflt(k))}
                />
              </div>
            );
          })}
          <p className="text-xs text-[var(--color-muted)]">
            The words on the Instagram buttons (for example &quot;Follow @akdovey&quot;) are in each page&apos;s tab. If you change the address here, update those words too. The PromptPay details are not editable from the dashboard.
          </p>
        </div>
      ) : (
        groups.map((group) => {
          const fields = tabFields.filter((f) => f.group === group);
          const groupChanged = fields.some((f) => fieldStorageKeys(f).some((k) => form[k] !== effectiveLive(k)));
          return (
            <details key={tab + group} open={openByDefault || groupChanged} className="group space-y-3">
              <summary className="cursor-pointer select-none min-h-11 flex items-center gap-2 text-base font-bold text-[var(--color-black)] list-none">
                <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90 text-[var(--color-muted)]">▸</span>
                {group}
                {groupChanged && <span className="w-2 h-2 rounded-full bg-amber-500" title="Has changes that are not published" />}
                <span className="text-xs font-normal text-[var(--color-muted)]">({fields.length} field{fields.length === 1 ? '' : 's'})</span>
              </summary>
              <div className="space-y-3 pt-1">
                {fields.map((f) => (
                  <div key={f.key} className="bg-white rounded-xl border border-[var(--color-black)]/10 p-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-[var(--color-black)]">{f.label}</h3>
                      {fieldStorageKeys(f).some((k) => form[k] !== effectiveLive(k)) && badge}
                    </div>
                    {f.hint && <p className="text-xs text-[var(--color-muted)] mb-2">{f.hint}</p>}
                    <div className="grid gap-3 md:grid-cols-2">
                      {(['en', 'th'] as const).map((l) => {
                        const k = l + '.' + f.key;
                        return (
                          <TextBox
                            key={k}
                            label={l === 'en' ? 'English' : 'Thai (ภาษาไทย)'}
                            value={form[k]}
                            long={f.long}
                            error={errors[k]}
                            isOriginal={form[k] === dflt(k)}
                            onChange={(v) => set(k, v)}
                            onReset={() => set(k, dflt(k))}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          );
        })
      )}

      <div className="pt-2 border-t border-[var(--color-black)]/10">
        {confirmReset ? (
          <span className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-black)]">
            Put every field on this tab back to the original wording? This changes the website right away.
            <button type="button" disabled={busy} onClick={restoreOriginal} className="min-h-11 px-3 rounded-full font-semibold bg-red-700 text-white disabled:opacity-50">
              Yes, restore
            </button>
            <button type="button" onClick={() => setConfirmReset(false)} className="min-h-11 px-3 rounded-full font-semibold border border-[var(--color-black)]/25 hover:border-[var(--color-forest)]">
              Cancel
            </button>
          </span>
        ) : (
          <button type="button" disabled={busy} onClick={() => setConfirmReset(true)} className="min-h-11 text-xs font-semibold text-[var(--color-muted)] hover:text-red-700 disabled:opacity-50">
            Restore original {tab === 'Links' ? 'links' : 'text'} for this tab
          </button>
        )}
      </div>
    </div>
  );
}
