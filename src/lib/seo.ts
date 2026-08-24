export const SITE_URL = 'https://grassrootssports.org';

const LOCALES = ['en', 'th'] as const;

/**
 * Builds canonical + hreflang alternate links for a locale-prefixed route.
 * `path` is the part after the locale segment, e.g. '' for home, '/about'.
 */
export function buildAlternates(locale: string, path: string = '') {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
  };
}
