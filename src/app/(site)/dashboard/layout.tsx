import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ClerkProvider } from '@clerk/nextjs';
import { notFound } from 'next/navigation';
import { getAdminEmail } from '@/lib/requireAdmin';
import { DashboardNav } from './DashboardNav';

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s | Grass Roots Sports Dashboard' },
  robots: { index: false, follow: false },
};

// ClerkProvider is scoped to this subtree so public visitors never load Clerk.
// The admin check here only decides what to render; every page's data loading
// and every server action re-checks admin status on its own, because layouts
// are not a security boundary in the App Router.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!(await getAdminEmail())) notFound();

  return (
    <ClerkProvider>
      <div className="dashboard-root min-h-screen bg-[var(--color-offwhite)]">
        <header className="sticky top-0 z-10 bg-[var(--color-black)] border-b-4 border-[var(--color-lime)] shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <Link href="/dashboard" className="flex items-center gap-3" aria-label="Dashboard home">
              <Image src="/logo.png" alt="Grass Roots Sports" width={40} height={40} className="h-10 w-10 rounded object-contain bg-white" />
              <div className="leading-tight">
                <p className="text-white font-extrabold text-base tracking-tight">Grass Roots Sports</p>
                <p className="text-[var(--color-lime)] text-[10px] font-bold uppercase tracking-widest">Website Dashboard</p>
              </div>
            </Link>
            <DashboardNav />
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {children}
          <p className="mt-10 text-xs text-[var(--color-muted)]">
            <Link href="/en" className="underline hover:text-[var(--color-forest)]">View the live website</Link>
          </p>
        </main>
      </div>
    </ClerkProvider>
  );
}
