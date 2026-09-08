import { NextResponse } from 'next/server';

// TEMPORARY diagnostic route — delete once the Blob storage issue is
// resolved. Never returns the actual token value, only safe metadata about
// it, to diagnose why uploads keep falling back to local disk.
export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const match = token?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i);
  return NextResponse.json({
    present: typeof token === 'string' && token.length > 0,
    length: token?.length ?? 0,
    prefix: token ? token.slice(0, 20) : null,
    suffix: token ? token.slice(-6) : null,
    matchesExpectedFormat: Boolean(match),
    extractedStoreId: match?.[1] ?? null,
  });
}
