'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Registration ends with scanning a PromptPay QR on the same phone someone's
// already browsing with — this keeps "Register" one tap away without
// needing to scroll back to the nav. Matches the header's own lg: breakpoint
// (not md:) since the full nav doesn't fit until then — this bar is what
// covers Register in between. Hidden on /register itself, where it would
// just duplicate the page's own submit button.
export default function StickyMobileCTA() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const segments = pathname.split('/');
  const locale = segments[1] || 'en';
  const rest = segments.slice(2).filter(Boolean).join('/');

  if (rest === 'register' || rest.startsWith('sign-in')) {
    return null;
  }

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-black)] border-t border-white/10 px-4 pt-3"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <Link
        href={`/${locale}/register`}
        className="block w-full text-center bg-[var(--color-forest)] active:bg-[var(--color-lime)] text-white font-bold py-3.5 rounded-lg uppercase tracking-widest text-sm transition-colors"
      >
        {t('register')}
      </Link>
    </div>
  );
}
