'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MarkPaidButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/admin/mark-paid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title={error ? 'Failed — try again' : undefined}
      className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors disabled:opacity-60 ${
        error
          ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
          : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
      }`}
    >
      {loading ? '...' : error ? 'Retry' : 'Mark paid'}
    </button>
  );
}
