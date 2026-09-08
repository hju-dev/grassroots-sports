import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  images: {
    // Vercel Blob URLs, once BLOB_READ_WRITE_TOKEN is set in production —
    // local dev without that token falls back to same-origin /api/media/file/*
    // and doesn't need this.
    remotePatterns: [{ protocol: 'https' as const, hostname: '*.public.blob.vercel-storage.com' }],
  },
};

export default withPayload(withNextIntl(nextConfig));