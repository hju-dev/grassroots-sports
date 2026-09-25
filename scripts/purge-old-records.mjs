// Yearly data-retention purge, matching the Privacy Policy section 5:
//   contact_messages : deleted 12 months after they were sent
//   registrations    : deleted 2 years after they were created
//                      (created_at is the only date stored, so it stands in
//                       for "last contact". Anyone who stayed in touch should
//                       be kept: see KEEP_EMAILS below.)
//
// DRY RUN by default: prints what WOULD be deleted and changes nothing.
// To delete for real, read the dry-run output first, then run with --execute.
//
//   node scripts/purge-old-records.mjs             (dry run)
//   node scripts/purge-old-records.mjs --execute   (deletes)
//
// Needs DATABASE_URL in the environment (the real value, from Vercel or Neon).
// Local .env.local only holds a placeholder for it. Run from a shell where it
// is set for this one command, and do not commit the value anywhere.
//
// Take a Neon branch or snapshot first if you want a way back: Neon history
// retention is only one day.

import { neon } from '@neondatabase/serverless';

const CONTACT_MONTHS = 12;
const REGISTRATION_MONTHS = 24;

// Emails to keep even when their registration is old (people still enrolled
// or still in touch). Add lower-case addresses here before running.
const KEEP_EMAILS = [];

const execute = process.argv.includes('--execute');

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('[SENSITIVE]')) {
  console.error('DATABASE_URL is not set to a real value. Nothing was done.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const contact = await sql`
  SELECT id, created_at FROM contact_messages
  WHERE created_at < NOW() - make_interval(months => ${CONTACT_MONTHS})
  ORDER BY created_at`;

const registrations = await sql`
  SELECT id, created_at FROM registrations
  WHERE created_at < NOW() - make_interval(months => ${REGISTRATION_MONTHS})
    AND lower(email) <> ALL(${KEEP_EMAILS})
  ORDER BY created_at`;

console.log(`${execute ? 'EXECUTING' : 'DRY RUN'}`);
console.log(`contact_messages older than ${CONTACT_MONTHS} months: ${contact.length}`);
console.log(`registrations older than ${REGISTRATION_MONTHS} months: ${registrations.length}`);
// Only ids and dates are printed, never names or emails.
for (const r of contact) console.log(`  contact_messages #${r.id} (${new Date(r.created_at).toISOString().slice(0, 10)})`);
for (const r of registrations) console.log(`  registrations #${r.id} (${new Date(r.created_at).toISOString().slice(0, 10)})`);

if (!execute) {
  console.log('\nNothing deleted. Re-run with --execute to delete the rows listed above.');
  process.exit(0);
}

const contactIds = contact.map((r) => r.id);
const registrationIds = registrations.map((r) => r.id);
if (contactIds.length) await sql`DELETE FROM contact_messages WHERE id = ANY(${contactIds})`;
if (registrationIds.length) await sql`DELETE FROM registrations WHERE id = ANY(${registrationIds})`;
console.log(`\nDeleted ${contactIds.length} contact messages and ${registrationIds.length} registrations.`);
