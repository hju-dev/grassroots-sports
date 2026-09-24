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

// ENFORCED policy for the public website pages (/en/... and /th/...) only.
// These pages load nothing from outside except Google Analytics and the
// site's own photo storage, so the allowlist is short: a foreign script,
// iframe or form target is blocked. 'unsafe-inline' stays for scripts because
// Next.js embeds its page data in inline scripts; no 'unsafe-eval' is needed
// in production. The dashboard, sign-in and CMS admin are NOT covered here:
// they load Clerk and Payload, and stay on the report-only policy above until
// they can be tested signed in.
const publicCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "frame-src 'none'",
  "object-src 'none'",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig = {
  poweredByHeader: false,
  // Dashboard photo uploads are sent through a server action. The default 1 MB
  // limit is too small; Vercel itself rejects request bodies over 4.5 MB.
  experimental: { serverActions: { bodySizeLimit: '4.5mb' as const } },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/:locale(en|th)/:path*', headers: [{ key: 'Content-Security-Policy', value: publicCsp }] },
    ];
  },
  images: {
    // Vercel Blob URLs, once BLOB_READ_WRITE_TOKEN is set in production —
    // local dev without that token falls back to same-origin /api/media/file/*
    // and doesn't need this.
    remotePatterns: [{ protocol: 'https' as const, hostname: '*.public.blob.vercel-storage.com' }],
  },
};

export default withPayload(withNextIntl(nextConfig));
