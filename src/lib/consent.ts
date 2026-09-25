// Analytics consent, stored in one first-party cookie so the choice survives
// visits. Google Analytics is only loaded after 'granted' (see AnalyticsGate).
// Client-only: every function touches document/window.

export const CONSENT_COOKIE = 'gr_consent';
export const CONSENT_EVENT = 'gr-consent-change';
export const CONSENT_OPEN_EVENT = 'gr-consent-open';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export type Consent = 'granted' | 'denied';

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`));
  return match ? (match[1] as Consent) : null;
}

export function writeConsent(value: Consent) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

// Turning analytics off after it loaded: tell gtag to stop, and remove the
// cookies it set (_ga, _ga_XXXX), on this host and on the parent domain.
export function withdrawAnalytics(gaId: string | undefined) {
  if (gaId) (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = true;
  const host = window.location.hostname;
  const parent = host.split('.').slice(-2).join('.');
  for (const part of document.cookie.split('; ')) {
    const name = part.split('=')[0];
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid') {
      for (const domain of [host, `.${parent}`]) {
        document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}`;
      }
      document.cookie = `${name}=; Max-Age=0; Path=/`;
    }
  }
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
