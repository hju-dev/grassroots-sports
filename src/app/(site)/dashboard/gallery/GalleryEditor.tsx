'use client';

import { useRef, useState } from 'react';
import {
  uploadGalleryPhoto,
  updateGalleryText,
  updateGalleryCategory,
  setGalleryPublished,
  reorderGalleryPhotos,
  deleteGalleryPhoto,
} from '../actions';
import { shrinkForUpload } from '../shrink';
import {
  GALLERY_CATEGORIES,
  GALLERY_CATEGORY_LABELS,
  GALLERY_TEXT_MAX,
  type GalleryPhoto,
  type GalleryTextField,
} from '@/lib/gallery-defs';

const STEPS = [
  { title: 'Add photos', body: 'Press "Add photos" and pick one or more pictures. New photos are saved as drafts, so nothing changes on the website yet.' },
  { title: 'Describe each photo', body: 'Type a short English description (for example "Youth players practicing layups"). It is required before publishing and helps people using screen readers and Google.' },
  { title: 'Pick a group and order', body: 'Choose Youth, Teen, Adult or Events so visitors can filter. Use the ← and → buttons to reorder. The first photo shows top-left.' },
  { title: 'Publish', body: 'Press "Publish" on a photo, or "Publish all drafts". Published photos show on the Gallery page within about a minute.' },
];

export function GalleryEditor({ initial }: { initial: GalleryPhoto[] }) {
  const [photos, setPhotos] = useState(initial);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [needsDescription, setNeedsDescription] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  // Last text known to be stored server-side, so leaving a box only saves real changes.
  const saved = useRef<Record<string, string>>(
    Object.fromEntries(initial.flatMap((p) => (['alt_en', 'alt_th', 'caption_en', 'caption_th'] as const).map((f) => [`${p.id}:${f}`, p[f]]))),
  );

  const drafts = photos.filter((p) => !p.published);

  async function run(label: string, task: () => Promise<void>) {
    setBusy(true);
    setStatus('');
    setErrors([]);
    try {
      await task();
      setStatus(label);
    } catch (err) {
      console.error(err);
      setErrors(["That didn't save. Check your connection and try again."]);
    } finally {
      setBusy(false);
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setBusy(true);
    setErrors([]);
    setStatus('');
    let added = 0;
    // One at a time: each upload is its own request, which keeps every request small.
    for (let i = 0; i < list.length; i++) {
      setStatus(`Uploading ${i + 1} of ${list.length}…`);
      const formData = new FormData();
      formData.append('file', await shrinkForUpload(list[i]));
      try {
        const result = await uploadGalleryPhoto(formData);
        if ('error' in result) {
          setErrors((prev) => [...prev, `${list[i].name}: ${result.error}`]);
        } else {
          for (const f of ['alt_en', 'alt_th', 'caption_en', 'caption_th'] as const) saved.current[`${result.photo.id}:${f}`] = result.photo[f];
          setPhotos((prev) => [...prev, result.photo]);
          added++;
        }
      } catch (err) {
        console.error(err);
        setErrors((prev) => [...prev, `${list[i].name}: upload failed. The file may be too large.`]);
      }
    }
    setStatus(added > 0 ? `✓ Added ${added} photo${added === 1 ? '' : 's'} as draft. Describe and publish them when you're ready.` : '');
    setBusy(false);
  }

  function setTextLocal(id: string, field: GalleryTextField, value: string) {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function saveText(photo: GalleryPhoto, field: GalleryTextField) {
    const key = `${photo.id}:${field}`;
    if (saved.current[key] === photo[field]) return;
    return run('✓ Saved', async () => {
      const result = await updateGalleryText(photo.id, field, photo[field]);
      if (result.error) {
        setErrors([result.error]);
        return;
      }
      saved.current[key] = photo[field].replace(/\s+/g, ' ').trim();
      setNeedsDescription((prev) => prev.filter((id) => id !== photo.id || !photo.alt_en.trim()));
    });
  }

  function setCategory(photo: GalleryPhoto, category: string) {
    return run('✓ Group saved', async () => {
      await updateGalleryCategory(photo.id, category);
      setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, category: category as GalleryPhoto['category'] } : p)));
    });
  }

  function togglePublished(ids: string[], published: boolean) {
    return run(
      published ? '✓ Published. It will appear on the website within about a minute.' : '✓ Unpublished. It is hidden from the website.',
      async () => {
        const result = await setGalleryPublished(ids, published);
        if (result.error) {
          setErrors([result.error]);
          setNeedsDescription(result.blocked ?? []);
          setStatus('');
          return;
        }
        setNeedsDescription([]);
        setPhotos((prev) => prev.map((p) => (ids.includes(p.id) ? { ...p, published } : p)));
      },
    );
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= photos.length) return;
    const next = [...photos];
    [next[index], next[target]] = [next[target], next[index]];
    return run('✓ Order saved', async () => {
      await reorderGalleryPhotos(next.map((p) => p.id));
      setPhotos(next);
    });
  }

  // Confirmed inline rather than with window.confirm, which some browsers block
  // or dismiss silently, leaving the button dead.
  function remove(photo: GalleryPhoto) {
    setConfirmDeleteId(null);
    return run('✓ Photo deleted', async () => {
      await deleteGalleryPhoto(photo.id);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    });
  }

  const field = 'w-full px-2 py-1.5 border border-[var(--color-black)]/15 rounded text-xs text-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]/50';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-black)]">Gallery</h1>
          <p className="text-sm text-[var(--color-muted)]">The photos shown on the website&apos;s Gallery page.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {drafts.length > 0 && (
            <button
              type="button"
              disabled={busy}
              onClick={() => togglePublished(drafts.map((p) => p.id), true)}
              className="min-h-11 px-4 rounded-full text-sm font-semibold bg-[var(--color-forest)] text-white hover:bg-[var(--color-lime)] hover:text-[var(--color-black)] disabled:opacity-50"
            >
              Publish all drafts ({drafts.length})
            </button>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={() => fileInput.current?.click()}
            className="min-h-11 px-4 rounded-full text-sm font-semibold bg-[var(--color-lime)] text-[var(--color-black)] hover:brightness-95 disabled:opacity-50"
          >
            + Add photos
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>
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

      <div aria-live="polite" className="min-h-5 space-y-1">
        {status && <p className="text-sm font-semibold text-[var(--color-forest)]">{status}</p>}
        {errors.map((e, i) => (
          <p key={i} className="text-sm font-semibold text-red-700">{e}</p>
        ))}
      </div>

      {photos.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-[var(--color-black)]/20 p-10 text-center text-sm text-[var(--color-muted)]">
          No photos yet. Press &quot;Add photos&quot; to upload your first one.
        </div>
      ) : (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <li
              key={photo.id}
              className={`bg-white rounded-xl border overflow-hidden flex flex-col ${
                needsDescription.includes(photo.id) ? 'border-red-500 ring-2 ring-red-200' : 'border-[var(--color-black)]/10'
              }`}
            >
              <div className="relative bg-[var(--color-sage)] aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element -- admin thumbnail from Blob storage */}
                <img
                  src={photo.url}
                  alt={photo.alt_en || 'Gallery photo (no description yet)'}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    photo.published ? 'bg-[var(--color-forest)] text-white' : 'bg-amber-300 text-[var(--color-black)]'
                  }`}
                >
                  {photo.published ? 'Live' : 'Draft'}
                </span>
              </div>
              <div className="p-3 space-y-2 flex-1 flex flex-col">
                <label className="block text-[11px] font-semibold text-[var(--color-body)]">
                  Group
                  <select
                    value={photo.category}
                    disabled={busy}
                    onChange={(e) => setCategory(photo, e.target.value)}
                    className={`${field} mt-0.5 bg-white`}
                  >
                    {GALLERY_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{GALLERY_CATEGORY_LABELS[c]}</option>
                    ))}
                  </select>
                </label>
                {(
                  [
                    ['alt_en', 'Description (English, required)', 2, 'Describe what is in the photo…'],
                    ['alt_th', 'Description (Thai, optional)', 2, 'Leave empty to show the English'],
                    ['caption_en', 'Caption (English)', 1, 'Short label shown on hover'],
                    ['caption_th', 'Caption (Thai, optional)', 1, 'Leave empty to show the English'],
                  ] as const
                ).map(([f, label, rows, placeholder]) => (
                  <label key={f} className="block text-[11px] font-semibold text-[var(--color-body)]">
                    {label}
                    <textarea
                      value={photo[f]}
                      onChange={(e) => setTextLocal(photo.id, f, e.target.value)}
                      onBlur={() => saveText(photo, f)}
                      rows={rows}
                      maxLength={GALLERY_TEXT_MAX[f]}
                      placeholder={placeholder}
                      className={`${field} mt-0.5 resize-none font-normal`}
                    />
                  </label>
                ))}
                {confirmDeleteId === photo.id ? (
                  <div className="flex flex-wrap items-center gap-2 mt-auto text-xs text-[var(--color-black)]">
                    Delete this photo? This cannot be undone.
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => remove(photo)}
                      className="min-h-11 px-3 rounded-full font-semibold bg-red-700 text-white disabled:opacity-50"
                    >
                      Yes, delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="min-h-11 px-3 rounded-full font-semibold border border-[var(--color-black)]/25 hover:border-[var(--color-forest)]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-auto pt-1">
                    <button
                      type="button"
                      disabled={busy || i === 0}
                      onClick={() => move(i, -1)}
                      aria-label="Move earlier"
                      title="Move earlier"
                      className="w-11 h-11 rounded-full border border-[var(--color-black)]/20 hover:border-[var(--color-forest)] disabled:opacity-30"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      disabled={busy || i === photos.length - 1}
                      onClick={() => move(i, 1)}
                      aria-label="Move later"
                      title="Move later"
                      className="w-11 h-11 rounded-full border border-[var(--color-black)]/20 hover:border-[var(--color-forest)] disabled:opacity-30"
                    >
                      →
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => togglePublished([photo.id], !photo.published)}
                      className={`flex-1 min-h-11 rounded-full text-xs font-semibold disabled:opacity-50 ${
                        photo.published
                          ? 'border border-[var(--color-black)]/25 hover:border-[var(--color-forest)]'
                          : 'bg-[var(--color-forest)] text-white hover:bg-[var(--color-lime)] hover:text-[var(--color-black)]'
                      }`}
                    >
                      {photo.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => setConfirmDeleteId(photo.id)}
                      aria-label="Delete photo"
                      title="Delete photo"
                      className="w-11 h-11 rounded-full text-[var(--color-muted)] hover:text-red-700 disabled:opacity-30"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
