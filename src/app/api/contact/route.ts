import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Resend } from 'resend';
import { sanitizeText } from '@/lib/sanitize';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const sql = getDb();
  const ip = getClientIp(request);
  if (await checkRateLimit(sql, `contact:${ip}`, { windowMs: 10 * 60 * 1000, max: 5 })) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const body = await request.json();
  const { website } = body;

  // Honeypot: bots fill every field, real users never see or fill this one.
  // Report success without writing anything, so bots don't learn to skip it.
  if (website) {
    console.warn(`[honeypot] contact ip="${ip}"`);
    return NextResponse.json({ success: true });
  }

  const name = sanitizeText(body.name, 100);
  const email = sanitizeText(body.email, 254);
  const message = sanitizeText(body.message, 2000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
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
    text: `Hi ${name},\n\nThanks for reaching out! We reply within 24 hours.\n\nFollow us on Instagram for updates: @akdovey\n\nGrass Roots Sports`,
  });

  return NextResponse.json({ success: true });
}
