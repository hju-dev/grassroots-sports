import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const sql = getDb();
  await sql`
    INSERT INTO contact_messages (name, email, message)
    VALUES (${name}, ${email}, ${message})
  `;

  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssports.org>',
    to: 'akdovey@gmail.com',
    subject: `New message from ${name}`,
    text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssports.org>',
    to: email,
    subject: 'Message received — Grass Roots Sports',
    text: `Hi ${name},\n\nThanks for reaching out! Alex will get back to you shortly.\n\nFollow us on Instagram for updates: @akdovey\n\n— Grass Roots Sports`,
  });

  return NextResponse.json({ success: true });
}
