import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, phone, program, locale } = await request.json();

  if (!name || !email || !phone || !program) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const validPrograms = ['youth', 'teen', 'adult', 'private'];
  if (!validPrograms.includes(program)) {
    return NextResponse.json({ error: 'Invalid program' }, { status: 400 });
  }

  const sql = getDb();
  await sql`
    INSERT INTO registrations (name, email, phone, program, locale)
    VALUES (${name}, ${email}, ${phone}, ${program}, ${locale ?? 'en'})
  `;

  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssports.org>',
    to: 'akdovey@gmail.com',
    subject: `New registration: ${program}`,
    text: `New registration\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgram: ${program}`,
  });

  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssports.org>',
    to: email,
    subject: 'Registration received — Grass Roots Sports',
    text: `Hi ${name},\n\nThanks for registering your interest in ${program}!\n\nAlex will be in touch shortly with pricing and next steps.\n\nFollow us on Instagram for updates: @akdovey\n\n— Grass Roots Sports`,
  });

  return NextResponse.json({ success: true });
}
