import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { name, email, message, website } = await request.json();

  // Honeypot: bots fill every field, real users never see or fill this one.
  // Report success without writing anything, so bots don't learn to skip it.
  if (website) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const sql = getDb();
  await sql`
    INSERT INTO contact_messages (name, email, message)
    VALUES (${name}, ${email}, ${message})
  `;

  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssports.org>',
    to: 'team@grassrootssports.org',
    subject: `New message from ${name}`,
    text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssports.org>',
    to: email,
    subject: 'Message received | Grass Roots Sports',
    text: `Hi ${name},\n\nThanks for reaching out! Alex will get back to you shortly.\n\nFollow us on Instagram for updates: @akdovey\n\nGrass Roots Sports`,
  });

  return NextResponse.json({ success: true });
}
