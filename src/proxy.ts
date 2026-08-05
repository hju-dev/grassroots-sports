import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(en|th)/:path*']
};