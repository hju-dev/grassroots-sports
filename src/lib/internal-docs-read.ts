import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { InternalDoc } from './internal-docs';

// Reads one of the fixed documents from /internal-docs. The file name comes
// from the INTERNAL_DOCS table, never from the request. next.config.ts lists
// this folder in outputFileTracingIncludes so it ships with the deployment.
export async function readInternalDoc(doc: InternalDoc): Promise<string | null> {
  try {
    return await readFile(path.join(process.cwd(), 'internal-docs', doc.file), 'utf8');
  } catch (err) {
    console.error('[internal-docs] could not read', doc.file, err);
    return null;
  }
}
