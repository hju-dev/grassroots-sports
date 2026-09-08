import config from '@payload-config';
import { getPayload, type Payload } from 'payload';

// getPayload() already caches the instance on the module scope internally —
// no extra memoization needed here (a hand-rolled global cache broke under
// Turbopack's dev-mode module isolation: the cached instance came from a
// different bundled copy of the `payload` package than the one calling it,
// so its prototype methods weren't recognized as functions).
export function getPayloadClient(): Promise<Payload> {
  return getPayload({ config });
}
