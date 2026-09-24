'use client';

import { useState } from 'react';
import { setRegistrationsOpen } from '../actions';

export function RegistrationSwitch({ initialOpen }: { initialOpen: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [busy, setBusy] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  async function change(next: boolean) {
    setConfirmClose(false);
    setBusy(true);
    setStatus(null);
    try {
      await setRegistrationsOpen(next);
      setOpen(next);
      setStatus({
        ok: true,
        text: next
          ? '✓ Registrations are open. The form is back on the website within about a minute.'
          : '✓ Registrations are closed. Visitors see the closed message within about a minute.',
      });
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, text: "That didn't save. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[var(--color-black)]/10 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
            open ? 'bg-[var(--color-forest)] text-white' : 'bg-amber-300 text-[var(--color-black)]'
          }`}
        >
          {open ? 'Open' : 'Closed'}
        </span>
        <p className="text-sm text-[var(--color-black)]">
          {open ? 'Visitors can register their interest.' : 'The form is hidden. Visitors see a closed message.'}
        </p>
      </div>

      {open && !confirmClose && (
        <button
          type="button"
          disabled={busy}
          onClick={() => setConfirmClose(true)}
          className="min-h-11 px-5 rounded-full text-sm font-semibold border border-[var(--color-black)]/25 hover:border-red-700 hover:text-red-700 disabled:opacity-50"
        >
          Close registrations
        </button>
      )}
      {open && confirmClose && (
        <span className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-black)]">
          Hide the registration form from the website?
          <button type="button" disabled={busy} onClick={() => change(false)} className="min-h-11 px-3 rounded-full font-semibold bg-red-700 text-white disabled:opacity-50">
            Yes, close it
          </button>
          <button type="button" onClick={() => setConfirmClose(false)} className="min-h-11 px-3 rounded-full font-semibold border border-[var(--color-black)]/25 hover:border-[var(--color-forest)]">
            Cancel
          </button>
        </span>
      )}
      {!open && (
        <button
          type="button"
          disabled={busy}
          onClick={() => change(true)}
          className="min-h-11 px-5 rounded-full text-sm font-semibold bg-[var(--color-forest)] text-white hover:bg-[var(--color-lime)] hover:text-[var(--color-black)] disabled:opacity-50"
        >
          Open registrations
        </button>
      )}

      <p aria-live="polite" className={`min-h-4 text-xs font-semibold ${status && !status.ok ? 'text-red-700' : 'text-[var(--color-forest)]'}`}>
        {status?.text}
      </p>
    </div>
  );
}
