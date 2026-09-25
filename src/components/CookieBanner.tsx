'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  CONSENT_OPEN_EVENT,
  readConsent,
  withdrawAnalytics,
  writeConsent,
} from '@/lib/consent';

// Shown on the first visit, and again when the footer's "Cookie settings" is
// used. Accept and Decline are the same size and style on purpose.
export default function CookieBanner({ gaId }: { gaId?: string }) {
  const t = useTranslations('consent');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // The cookie can only be read in the browser, so the first-visit check
    // has to run after mount.
    const open = () => setVisible(true);
    if (readConsent() === null) open();
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  function choose(value: 'granted' | 'denied') {
    if (value === 'denied') withdrawAnalytics(gaId);
    writeConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  const buttonClass =
    'flex-1 sm:flex-none sm:min-w-32 rounded-lg border-2 border-white bg-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-lime)]';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 bg-[var(--color-black)] px-4 py-4 shadow-2xl"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center">
        <div className="text-sm text-white/90">
          <p id="cookie-banner-title" className="mb-1 font-bold text-white">
            {t('title')}
          </p>
          <p className="leading-relaxed">
            {t('body')}{' '}
            <Link href={`/${locale}/privacy`} className="underline hover:text-[var(--color-lime)]">
              {t('privacyLink')}
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => choose('denied')} className={buttonClass}>
            {t('decline')}
          </button>
          <button type="button" onClick={() => choose('granted')} className={buttonClass}>
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
