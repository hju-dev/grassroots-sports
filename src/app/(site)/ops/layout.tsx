import { ClerkProvider, UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getAdminEmail } from '@/lib/requireAdmin';

// ClerkProvider is scoped to just this subtree (not the root layout) so
// public site visitors never load Clerk or get its cookies — see the note
// in src/app/(site)/layout.tsx.
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
        <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black text-lg tracking-tight">
              <span className="text-green-400">Grass Roots</span> Sports
            </span>
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded font-mono">Admin</span>
          </div>
          <UserButton />
        </header>
        {children}
      </div>
    </ClerkProvider>
  );
}
