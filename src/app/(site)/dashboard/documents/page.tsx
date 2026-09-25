import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INTERNAL_DOCS } from '@/lib/internal-docs';
import { getAdminEmail } from '@/lib/requireAdmin';

export const metadata: Metadata = { title: 'Documents' };
export const dynamic = 'force-dynamic';

export default async function DocumentsPage() {
  // Layouts are not a security boundary: check again before showing anything.
  if (!(await getAdminEmail())) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-black)]">Documents</h1>
        <p className="text-sm text-[var(--color-muted)] max-w-2xl">
          Internal notes for the people who run the site. They are only visible when you are signed in here, and they are not part of the public website.
        </p>
      </div>
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {INTERNAL_DOCS.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/dashboard/documents/${doc.slug}`}
              className="flex h-full flex-col bg-white rounded-xl border border-[var(--color-black)]/10 p-5 hover:border-[var(--color-forest)] transition-colors"
            >
              <h2 className="text-base font-bold text-[var(--color-black)] mb-3">{doc.title}</h2>
              <dl className="space-y-2 text-sm leading-snug">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-forest)]">What it is</dt>
                  <dd className="text-[var(--color-muted)]">{doc.whatItIs}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-forest)]">What it is used for</dt>
                  <dd className="text-[var(--color-muted)]">{doc.usedFor}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-forest)]">Who uses it</dt>
                  <dd className="text-[var(--color-muted)]">{doc.whoUsesIt}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-forest)]">Status</dt>
                  <dd className="text-[var(--color-muted)]">{doc.status}</dd>
                </div>
              </dl>
              <span className="mt-auto pt-4 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-forest)]">Read →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
