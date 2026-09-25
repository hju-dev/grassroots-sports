import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalDocView from '@/components/InternalDocView';
import { getInternalDoc } from '@/lib/internal-docs';
import { readInternalDoc } from '@/lib/internal-docs-read';
import { getAdminEmail } from '@/lib/requireAdmin';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getInternalDoc(slug)?.title ?? 'Documents' };
}

export default async function DocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  // Layouts are not a security boundary: check again before reading the file.
  if (!(await getAdminEmail())) notFound();

  const { slug } = await params;
  const doc = getInternalDoc(slug);
  if (!doc) notFound();
  const markdown = await readInternalDoc(doc);

  return (
    <div className="space-y-6">
      <p className="text-sm">
        <Link href="/dashboard/documents" className="text-[var(--color-forest)] underline">← All documents</Link>
      </p>
      <section className="max-w-3xl rounded-xl border border-[var(--color-lime)]/60 bg-white p-5 space-y-2 text-sm">
        <h1 className="text-lg font-bold text-[var(--color-black)]">{doc.title}</h1>
        <p><span className="font-semibold text-[var(--color-black)]">What it is: </span><span className="text-[var(--color-muted)]">{doc.whatItIs}</span></p>
        <p><span className="font-semibold text-[var(--color-black)]">What it is used for: </span><span className="text-[var(--color-muted)]">{doc.usedFor}</span></p>
        <p><span className="font-semibold text-[var(--color-black)]">Who uses it: </span><span className="text-[var(--color-muted)]">{doc.whoUsesIt}</span></p>
        <p><span className="font-semibold text-[var(--color-black)]">Status: </span><span className="text-[var(--color-muted)]">{doc.status}</span></p>
      </section>
      {markdown === null ? (
        <p className="text-sm text-red-700">This document could not be loaded. Tell the developer.</p>
      ) : (
        <InternalDocView markdown={markdown} />
      )}
    </div>
  );
}
