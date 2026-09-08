import type { getDb } from '@/lib/db';

type Sql = ReturnType<typeof getDb>;

// Sliding-window rate limit backed by the existing Neon DB — Vercel
// serverless functions don't share in-memory state across invocations, so
// this can't be a simple in-process counter.
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'unknown';
}

export async function checkRateLimit(
  sql: Sql,
  bucket: string,
  { windowMs = 10 * 60 * 1000, max = 5 }: { windowMs?: number; max?: number } = {}
): Promise<boolean> {
  // rate_limit_hits already exists in production (schema.sql) — this used to
  // run CREATE TABLE/INDEX IF NOT EXISTS here on every request "just in
  // case," but each `sql` call is its own HTTP round-trip to Neon
  // (@neondatabase/serverless's fetch-based driver, not a pooled
  // connection), so that was 2 of the 4 round-trips this function made on
  // every single submission — measured at 1.2-2.9s total round-trip on a
  // honeypot-only request that does almost nothing else. Removing the two
  // no-op DDL calls roughly halves that.
  const windowStart = new Date(Date.now() - windowMs);
  const rows = (await sql`
    SELECT count(*)::int AS count FROM rate_limit_hits
    WHERE bucket = ${bucket} AND created_at > ${windowStart}
  `) as Array<{ count: number }>;

  if (rows[0].count >= max) {
    // Deliberately minimal — bucket + count only, no request body/headers —
    // but enough for Vercel's Function Logs to show a repeat offender
    // without needing a separate monitoring service for a site this size.
    console.warn(`[rate-limit] blocked bucket="${bucket}" count=${rows[0].count} max=${max}`);
    return true;
  }

  await sql`INSERT INTO rate_limit_hits (bucket) VALUES (${bucket})`;

  // Opportunistic cleanup so the table doesn't grow unbounded — no cron job
  // needed, this just runs on a small fraction of requests.
  if (Math.random() < 0.02) {
    await sql`DELETE FROM rate_limit_hits WHERE created_at < NOW() - INTERVAL '1 day'`;
  }

  return false;
}
