import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getDb } from '@/lib/db';
import { isAdminEmail } from '@/lib/adminEmails';
import { isBodyTooLarge } from '@/lib/requestSize';

export async function POST(request: Request) {
  if (isBodyTooLarge(request, 1_000)) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!isAdminEmail(email)) {
    console.warn(`[auth] mark-paid rejected email="${email ?? 'none'}"`);
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
