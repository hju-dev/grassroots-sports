'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

const TABS = [
  { href: '/dashboard/gallery', label: 'Gallery' },
  { href: '/dashboard/content', label: 'Text & links' },
  { href: '/dashboard/images', label: 'Images' },
  { href: '/dashboard/schedule', label: 'Schedule' },
  { href: '/dashboard/registration', label: 'Form on/off' },
  { href: '/ops', label: 'Sign-ups list' },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <nav className="flex gap-1 sm:gap-2 overflow-x-auto" aria-label="Dashboard sections">
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className={`inline-flex min-h-11 items-center px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                active
                  ? 'bg-[var(--color-lime)] text-[var(--color-black)] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex-none">
        <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 ring-2 ring-[var(--color-lime)]' } }} />
      </div>
    </div>
  );
}
