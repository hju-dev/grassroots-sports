import { UserButton } from '@clerk/nextjs';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
