import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ClerkProvider } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getAdminEmail } from '@/lib/requireAdmin';
import { DashboardNav } from '../dashboard/DashboardNav';

export const metadata: Metadata = {
  title: { default: 'Sign-ups list', template: '%s | Grass Roots Sports Dashboard' },
  robots: { index: false, follow: false },
};

// ClerkProvider is scoped to just this subtree (not the root layout) so
// public site visitors never load Clerk or get its cookies — see the note
// in src/app/(site)/layout.tsx. The header and tab bar match the dashboard's,
// so every section can be reached from here without the browser's back button.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Layouts are not a security boundary in the App Router (they can be skipped
  // on client navigation), so page.tsx repeats this check before reading data.
  if (!(await getAdminEmail())) {
    console.warn('[auth] /ops rejected non-admin');
    redirect('/');
  }
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-[var(--color-black)] border-b-4 border-[var(--color-lime)] shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <Link href="/dashboard" className="flex items-center gap-3" aria-label="Back to dashboard home">
              <Image src="/logo.png" alt="Grass Roots Sports" width={40} height={40} className="h-10 w-10 rounded object-contain bg-white" />
              <div className="leading-tight">
                <p className="text-white font-extrabold text-base tracking-tight">Grass Roots Sports</p>
                <p className="text-[var(--color-lime)] text-[10px] font-bold uppercase tracking-widest">Website Dashboard</p>
              </div>
            </Link>
            <DashboardNav />
          </div>
        </header>
        {children}
      </div>
    </ClerkProvider>
  );
}
