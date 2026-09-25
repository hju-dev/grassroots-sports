'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteContactMessage, deleteRegistration } from '@/app/(site)/ops/actions';

// Permanent delete with an inline Yes / Cancel step. window.confirm is not
// used: some browsers silently block it, which would make the button dead.
export default function DeleteRecordButton({
  kind,
  id,
  label,
}: {
  kind: 'registration' | 'message';
  id: number;
  /** Shown to screen readers, e.g. the person's name. */
  label: string;
}) {
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function confirmDelete() {
    setError('');
    startTransition(async () => {
      try {
        const result = kind === 'registration' ? await deleteRegistration(id) : await deleteContactMessage(id);
        if (result.ok) {
          setAsking(false);
          router.refresh();
        } else {
          setError(result.error);
        }
      } catch {
        setError('Could not delete. Please try again.');
      }
    });
  }

  if (!asking) {
    return (
      <button
        type="button"
        onClick={() => setAsking(true)}
        aria-label={`Delete ${label}`}
        className="text-xs font-semibold px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
      >
        Delete
      </button>
    );
  }

  return (
    <div role="alertdialog" aria-label={`Confirm deleting ${label}`} className="max-w-xs text-left">
      <p className="text-xs text-gray-700 leading-snug mb-2">
        Delete this {kind === 'registration' ? 'registration' : 'message'} for good? This cannot be undone. Remember to delete the copy in the team@ inbox too.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={confirmDelete}
          disabled={pending}
          className="text-xs font-semibold px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 transition-colors"
        >
          {pending ? '...' : 'Yes, delete'}
        </button>
        <button
          type="button"
          onClick={() => {
            setAsking(false);
            setError('');
          }}
          disabled={pending}
          className="text-xs font-semibold px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-60 transition-colors"
        >
          Cancel
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
