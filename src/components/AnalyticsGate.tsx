'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { CONSENT_EVENT, readConsent } from '@/lib/consent';

// Renders Google Analytics only after the visitor has accepted analytics.
// Nothing from Google is requested before that.
export default function AnalyticsGate({ gaId }: { gaId: string }) {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => setGranted(readConsent() === 'granted');
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  return granted ? <GoogleAnalytics gaId={gaId} /> : null;
}
