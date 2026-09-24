import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminEmail } from '@/lib/requireAdmin';
import { getDb } from '@/lib/db';
import { RegistrationSwitch } from './RegistrationSwitch';

export const metadata: Metadata = { title: 'Registration' };
export const dynamic = 'force-dynamic';

export default async function RegistrationPage() {
  // Re-checked here (not only in the layout) so this page never loads for a non-admin.
  if (!(await getAdminEmail())) notFound();

  let open = true;
  try {
    const sql = getDb();
    const rows = (await sql`SELECT value FROM site_settings WHERE key = 'registrations_open'`) as Array<{ value: string }>;
    open = rows[0]?.value !== 'false';
  } catch (err) {
    console.error('[dashboard registration]', err);
    return (
      <div className="bg-white rounded-xl border border-[var(--color-black)]/10 p-6 text-sm">
        <p className="font-semibold mb-1">This switch isn&apos;t set up yet.</p>
        <p className="text-[var(--color-muted)]">
          The <code>site_settings</code> table needs to be created in the database first. Registrations stay open in the meantime.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-black)]">Registration form on/off</h1>
        <p className="text-sm text-[var(--color-muted)]">
          Turn the Register Interest form on or off for everyone. While it is off, visitors see a short &quot;Registrations Closed&quot; message with a link to Instagram instead of the form.
        </p>
      </div>
      <RegistrationSwitch initialOpen={open} />
      <p className="text-xs text-[var(--color-muted)]">
        You can change the wording of the closed message in{' '}
        <Link href="/dashboard/content" className="underline hover:text-[var(--color-black)]">Text &amp; links</Link>, under Register.
        To see who has registered, use <Link href="/ops" className="underline hover:text-[var(--color-black)]">Sign-ups list</Link>.
      </p>
    </div>
  );
}
