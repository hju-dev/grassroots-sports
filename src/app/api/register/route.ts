import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Resend } from 'resend';
import { sanitizeText } from '@/lib/sanitize';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { isBodyTooLarge } from '@/lib/requestSize';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (isBodyTooLarge(request, 10_000)) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 });
  }

  const sql = getDb();
  const ip = getClientIp(request);
  if (await checkRateLimit(sql, `register:${ip}`, { windowMs: 10 * 60 * 1000, max: 5 })) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const body = await request.json();
  const { website, locale } = body;

  // Honeypot: bots fill every field, real users never see or fill this one.
  // Report success without writing anything, so bots don't learn to skip it.
  if (website) {
    console.warn(`[honeypot] register ip="${ip}"`);
    return NextResponse.json({ success: true });
  }

  const name = sanitizeText(body.name, 100);
  const email = sanitizeText(body.email, 254);
  const phone = sanitizeText(body.phone, 30);
  const program = sanitizeText(body.program, 20);

  if (!name || !email || !phone || !program) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const validPrograms = ['youth', 'teen', 'adult', 'private'];
  if (!validPrograms.includes(program)) {
    return NextResponse.json({ error: 'Invalid program' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await sql`
    INSERT INTO registrations (name, email, phone, program, locale)
    VALUES (${name}, ${email}, ${phone}, ${program}, ${locale ?? 'en'})
  `;

  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssports.org>',
    to: 'team@grassrootssports.org',
    subject: `New registration: ${program}`,
    text: `New registration\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgram: ${program}`,
  });

  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssports.org>',
    to: email,
    subject: 'Registration received | Grass Roots Sports',
    text: `Hi ${name},\n\nThanks for registering your interest in ${program}!\n\nAlex will be in touch shortly with pricing and next steps.\n\nFollow us on Instagram for updates: @akdovey\n\nGrass Roots Sports`,
  });

  return NextResponse.json({ success: true });
}
