'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const segments = pathname.split('/');
  const locale = segments[1] || 'en';
  const otherLocale = locale === 'en' ? 'th' : 'en';
  const rest = segments.slice(2).filter(Boolean).join('/');
  const otherLocalePath = rest ? `/${otherLocale}/${rest}` : `/${otherLocale}`;

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/programs`, label: t('programs') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-black)] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Grass Roots Sports"
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <span className="font-black text-lg tracking-tight">
            <span className="text-[var(--color-forest)]">Grass Roots </span>
            <span className="text-white">Sports</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide hover:text-[var(--color-lime)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={otherLocalePath}
            className="text-xs border border-white/30 rounded px-3 py-1 uppercase tracking-widest hover:border-[var(--color-lime)] hover:text-[var(--color-lime)] transition-colors"
          >
            {otherLocale}
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-5 h-0.5 bg-white mb-1.5" />
          <span className="block w-5 h-0.5 bg-white mb-1.5" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[var(--color-black)] border-t border-white/10 px-4 pb-4 pt-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium uppercase tracking-wide border-b border-white/5 last:border-0 hover:text-[var(--color-lime)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={otherLocalePath}
            className="block pt-3 text-xs text-[var(--color-muted)] uppercase tracking-widest hover:text-[var(--color-lime)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Switch to {otherLocale.toUpperCase()}
          </Link>
        </div>
      )}
    </header>
  );
}
