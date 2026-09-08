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
  await sql`
    CREATE TABLE IF NOT EXISTS rate_limit_hits (
      id         SERIAL PRIMARY KEY,
      bucket     TEXT        NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS rate_limit_hits_bucket_created_idx ON rate_limit_hits (bucket, created_at)`;

  const windowStart = new Date(Date.now() - windowMs);
  const rows = (await sql`
    SELECT count(*)::int AS count FROM rate_limit_hits
    WHERE bucket = ${bucket} AND created_at > ${windowStart}
  `) as Array<{ count: number }>;

  if (rows[0].count >= max) {
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
