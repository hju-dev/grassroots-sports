import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAdminEmail } from '@/lib/requireAdmin';
import { isBodyTooLarge } from '@/lib/requestSize';

const ALLOWED_ORIGINS = ['https://www.grassrootssports.org', 'http://localhost:3000'];

export async function POST(request: Request) {
  if (isBodyTooLarge(request, 1_000)) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 });
  }

  // Same-origin browser calls always send Origin on POST. Rejecting anything
  // else is a second layer behind the session cookie's SameSite protection.
  const origin = request.headers.get('origin');
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!(await getAdminEmail())) {
    console.warn('[auth] mark-paid rejected non-admin');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const id = Number(body?.id);
  if (!id || !Number.isInteger(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const sql = getDb();
  await sql`UPDATE registrations SET paid = true WHERE id = ${id}`;

  return NextResponse.json({ success: true });
}
