import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// CSP ships as Report-Only first: the browser logs violations to the console
// but blocks nothing, so a missing allowlist entry can't break Clerk, Payload
// admin, or analytics. Once the console is clean on every page, rename the key
// to 'Content-Security-Policy' to enforce it.
const csp = [
  "default-src 'self'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://img.clerk.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com https://va.vercel-scripts.com https://www.googletagmanager.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://vitals.vercel-insights.com https://www.google-analytics.com https://*.analytics.google.com",
  "frame-src https://challenges.cloudflare.com https://*.clerk.accounts.dev",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Content-Security-Policy-Report-Only', value: csp },
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  images: {
    // Vercel Blob URLs, once BLOB_READ_WRITE_TOKEN is set in production —
    // local dev without that token falls back to same-origin /api/media/file/*
    // and doesn't need this.
    remotePatterns: [{ protocol: 'https' as const, hostname: '*.public.blob.vercel-storage.com' }],
  },
};

export default withPayload(withNextIntl(nextConfig));
