'use client';

import { openConsentSettings } from '@/lib/consent';

export default function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="text-xs text-[var(--color-muted)] hover:text-white transition-colors"
    >
      {label}
    </button>
  );
}
