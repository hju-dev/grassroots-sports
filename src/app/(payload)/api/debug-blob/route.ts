import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

// TEMPORARY diagnostic route — delete once the Blob storage issue is
// resolved. Never returns the actual token value, only safe metadata about
// it, to diagnose why uploads keep falling back to local disk.
export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const match = token?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i);

  const payload = await getPayloadClient();
  const mediaCollection = payload.collections['media'];
  const uploadConfig = mediaCollection?.config?.upload;
  const hasAdapter = typeof uploadConfig === 'object' && uploadConfig !== null && 'adapter' in uploadConfig;

  return NextResponse.json({
    envToken: {
      present: typeof token === 'string' && token.length > 0,
      length: token?.length ?? 0,
      matchesExpectedFormat: Boolean(match),
      extractedStoreId: match?.[1] ?? null,
    },
    mediaCollectionConfig: {
      uploadConfigIsObject: typeof uploadConfig === 'object',
      disableLocalStorage: typeof uploadConfig === 'object' ? uploadConfig?.disableLocalStorage : null,
      hasAdapterKey: hasAdapter,
      adapterIsFunction: hasAdapter ? typeof (uploadConfig as Record<string, unknown>).adapter === 'function' : null,
    },
  });
}
