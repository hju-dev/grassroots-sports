'use client';

import { useRef, useState } from 'react';
import { uploadSlotImage, publishSlotImage, discardSlotDraft, resetSlotImage, updateSlotAlt } from '../actions';
import { shrinkForUpload } from '../shrink';
import { IMAGE_SLOTS, SLOT_PAGES, type SlotKey, type SlotView } from '@/lib/image-slot-defs';

const STEPS = [
  { title: 'Find the image', body: 'Each card below is one picture on the website. The text under the title says where it appears.' },
  { title: 'Choose a new picture', body: 'Press "Choose new image". Your new picture appears next to the current one as a draft. The website does not change yet.' },
  { title: 'Check it', body: 'Compare "On the website now" with "New (not published)". If you do not like it, press "Discard" or choose another.' },
  { title: 'Publish', body: 'Press "Publish". The new picture shows on the website within about a minute.' },
];

const DEFS = Object.fromEntries(IMAGE_SLOTS.map((d) => [d.key, d])) as Record<SlotKey, (typeof IMAGE_SLOTS)[number]>;

function Preview({ src, label, width, height, alt }: { src: string; label: string; width: number; height: number; alt: string }) {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)] mb-1">{label}</p>
      <div className="bg-[var(--color-sage)] border border-[var(--color-black)]/10 rounded-lg h-40 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- admin preview, sources vary (Blob or bundled) */}
        <img src={src} width={width} height={height} alt={alt} className="max-w-full max-h-full object-contain" />
      </div>
    </div>
  );
}

export function ImageSlotsEditor({ initial }: { initial: SlotView[] }) {
  const [slots, setSlots] = useState(initial);
  const [busyKey, setBusyKey] = useState<SlotKey | null>(null);
  const [confirmKey, setConfirmKey] = useState<SlotKey | null>(null);
  const [messages, setMessages] = useState<Partial<Record<SlotKey, { ok: boolean; text: string }>>>({});
  // Last description known to be stored server-side, so leaving a box only saves real changes.
  const saved = useRef<Record<string, string>>(
    Object.fromEntries(initial.flatMap((s) => [[`${s.key}:en`, s.alt_en], [`${s.key}:th`, s.alt_th]])),
  );

  function say(key: SlotKey, ok: boolean, text: string) {
    setMessages((prev) => ({ ...prev, [key]: { ok, text } }));
  }

  function patch(key: SlotKey, fn: (s: SlotView) => SlotView) {
    setSlots((prev) => prev.map((s) => (s.key === key ? fn(s) : s)));
  }

  // A task may return a message to report a problem it already understands
  // (for example "too large"); anything thrown is a save failure.
  async function run(key: SlotKey, okText: string, task: () => Promise<string | void>) {
    setBusyKey(key);
    setMessages((prev) => ({ ...prev, [key]: undefined }));
    try {
      const problem = await task();
      if (problem) say(key, false, problem);
      else say(key, true, okText);
    } catch (err) {
      console.error(err);
      say(key, false, "That didn't save. Check your connection and try again.");
    } finally {
      setBusyKey(null);
    }
  }

  function handleFile(key: SlotKey, file: File) {
    return run(key, '✓ New image added as a draft. Press "Publish" when it looks right.', async () => {
      const formData = new FormData();
      formData.append('file', await shrinkForUpload(file));
      const result = await uploadSlotImage(key, formData);
      if ('error' in result) return result.error;
      patch(key, (s) => ({ ...s, draft: result.draft }));
    });
  }

  function publish(slot: SlotView) {
    const draft = slot.draft;
    if (!draft) return;
    return run(slot.key, '✓ Published. It will appear on the website within about a minute.', async () => {
      const result = await publishSlotImage(slot.key);
      if (result.error) return result.error;
      patch(slot.key, (s) => ({ ...s, isCustom: true, current: { src: draft.url, width: draft.width, height: draft.height }, draft: null }));
    });
  }

  function discard(slot: SlotView) {
    return run(slot.key, '✓ Draft discarded.', async () => {
      await discardSlotDraft(slot.key);
      patch(slot.key, (s) => ({ ...s, draft: null }));
    });
  }

  // Confirmed inline (see the buttons below) rather than with window.confirm,
  // which some browsers block or dismiss silently, leaving the button dead.
  function restore(slot: SlotView) {
    setConfirmKey(null);
    const def = DEFS[slot.key];
    return run(slot.key, '✓ Original image restored.', async () => {
      await resetSlotImage(slot.key);
      saved.current[`${slot.key}:en`] = def.fallback.alt;
      saved.current[`${slot.key}:th`] = '';
      patch(slot.key, (s) => ({
        ...s,
        isCustom: false,
        current: { src: def.fallback.src, width: def.fallback.width, height: def.fallback.height },
        alt_en: def.fallback.alt,
        alt_th: '',
      }));
    });
  }

  function saveAlt(slot: SlotView, lang: 'en' | 'th') {
    const value = lang === 'en' ? slot.alt_en : slot.alt_th;
    if (saved.current[`${slot.key}:${lang}`] === value) return;
    return run(slot.key, '✓ Description saved.', async () => {
      const result = await updateSlotAlt(slot.key, lang, value);
      if (result.error) return result.error;
      saved.current[`${slot.key}:${lang}`] = value;
    });
  }

  const input = 'mt-1 w-full px-2 py-1.5 border border-[var(--color-black)]/15 rounded text-sm text-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]/50';
  const label = 'text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)]';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-black)]">Site images</h1>
        <p className="text-sm text-[var(--color-muted)]">
          Replace the pictures on the website. The photo gallery has its own tab.
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

      {SLOT_PAGES.map((page) => (
        <section key={page} className="space-y-3">
          <h2 className="text-base font-bold text-[var(--color-black)]">{page}</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {slots
              .filter((s) => DEFS[s.key].page === page)
              .map((slot) => {
                const def = DEFS[slot.key];
                const busy = busyKey === slot.key;
                const msg = messages[slot.key];
                return (
                  <div key={slot.key} className="bg-white rounded-xl border border-[var(--color-black)]/10 p-4 space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--color-black)]">{def.label}</h3>
                      <p className="text-xs text-[var(--color-muted)]">{def.where}</p>
                      <p className="text-xs text-[var(--color-muted)] mt-0.5">Tip: {def.tip}</p>
                    </div>

                    <div className="flex gap-3">
                      <Preview
                        src={slot.current.src}
                        width={slot.current.width}
                        height={slot.current.height}
                        alt={slot.alt_en}
                        label={slot.isCustom ? 'On the website now' : 'On the website now (original)'}
                      />
                      {slot.draft && (
                        <Preview
                          src={slot.draft.url}
                          width={slot.draft.width}
                          height={slot.draft.height}
                          alt="New image, not published yet"
                          label="New (not published)"
                        />
                      )}
                    </div>

                    <label className="block">
                      <span className={label}>Description (English), for screen readers and Google</span>
                      <input
                        value={slot.alt_en}
                        maxLength={300}
                        onChange={(e) => patch(slot.key, (s) => ({ ...s, alt_en: e.target.value }))}
                        onBlur={() => saveAlt(slot, 'en')}
                        className={input}
                      />
                    </label>
                    <label className="block">
                      <span className={label}>Description (Thai, optional)</span>
                      <input
                        value={slot.alt_th}
                        maxLength={300}
                        placeholder="Leave empty to show the English"
                        onChange={(e) => patch(slot.key, (s) => ({ ...s, alt_th: e.target.value }))}
                        onBlur={() => saveAlt(slot, 'th')}
                        className={input}
                      />
                    </label>

                    <div className="flex flex-wrap items-center gap-2">
                      <label
                        className={`inline-flex min-h-11 items-center px-4 rounded-full text-sm font-semibold bg-[var(--color-lime)] text-[var(--color-black)] cursor-pointer hover:brightness-95 ${busy ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        {busy ? 'Working…' : 'Choose new image'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={busy}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFile(slot.key, file);
                            e.target.value = '';
                          }}
                        />
                      </label>
                      {slot.draft && (
                        <>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => publish(slot)}
                            className="min-h-11 px-4 rounded-full text-sm font-semibold bg-[var(--color-forest)] text-white hover:bg-[var(--color-lime)] hover:text-[var(--color-black)] disabled:opacity-50"
                          >
                            Publish
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => discard(slot)}
                            className="min-h-11 px-4 rounded-full text-sm font-semibold border border-[var(--color-black)]/25 hover:border-[var(--color-forest)] disabled:opacity-50"
                          >
                            Discard
                          </button>
                        </>
                      )}
                      {slot.isCustom && !slot.draft && confirmKey !== slot.key && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => setConfirmKey(slot.key)}
                          className="min-h-11 px-3 text-xs font-semibold text-[var(--color-muted)] hover:text-red-700 disabled:opacity-50"
                        >
                          Restore original
                        </button>
                      )}
                      {slot.isCustom && !slot.draft && confirmKey === slot.key && (
                        <span className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-black)]">
                          Go back to the original image?
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => restore(slot)}
                            className="min-h-11 px-3 rounded-full font-semibold bg-red-700 text-white disabled:opacity-50"
                          >
                            Yes, restore
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmKey(null)}
                            className="min-h-11 px-3 rounded-full font-semibold border border-[var(--color-black)]/25 hover:border-[var(--color-forest)]"
                          >
                            Cancel
                          </button>
                        </span>
                      )}
                    </div>

                    <p aria-live="polite" className={`min-h-4 text-xs font-semibold ${msg && !msg.ok ? 'text-red-700' : 'text-[var(--color-forest)]'}`}>
                      {msg?.text}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
