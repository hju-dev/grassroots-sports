import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { isAdminEmail } from '@/lib/adminEmails';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!isAdminEmail(email)) {
    redirect('/');
  }
  return (
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
  );
}
