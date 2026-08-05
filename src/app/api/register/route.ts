import { NextResponse } from 'next/server';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, phone, program } = await request.json();

  if (!name || !email || !phone || !program) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  /* TODO: uncomment when RESEND_API_KEY is added to Vercel env vars
  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssportsth.com>',
    to: 'akdovey@gmail.com',
    subject: `New registration: ${program}`,
    text: `New registration\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgram: ${program}`,
  });

  await resend.emails.send({
    from: 'Grass Roots Sports <noreply@grassrootssportsth.com>',
    to: email,
    subject: 'Registration received — Grass Roots Sports',
    text: `Hi ${name},\n\nThanks for registering your interest in ${program}!\n\nAlex will be in touch shortly with pricing and next steps.\n\nFollow us on Instagram for updates: @akdovey\n\n— Grass Roots Sports`,
  });
  */

  return NextResponse.json({ success: true });
}
