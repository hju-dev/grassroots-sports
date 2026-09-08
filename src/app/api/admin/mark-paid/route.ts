import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getDb } from '@/lib/db';
import { isAdminEmail } from '@/lib/adminEmails';

export async function POST(request: Request) {
  const user = await currentUser();
  if (!isAdminEmail(user?.emailAddresses?.[0]?.emailAddress)) {
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
