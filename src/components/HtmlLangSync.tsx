'use client';

import { useEffect } from 'react';

// The root <html lang> is hardcoded because the root layout (app/layout.tsx)
// sits above the [locale] segment and Next.js never resolves that param into it.
// This syncs the real value client-side once the locale layout knows it.
export default function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
