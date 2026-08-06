import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function Footer({ locale }: { locale: string }) {
  const tNav = await getTranslations('nav');
  const tFooter = await getTranslations('footer');

  return (
    <footer className="bg-[var(--color-black)] text-white/80 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="Grass Roots Sports"
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
              <p className="font-black text-xl tracking-tight leading-tight">
                <span className="text-[var(--color-forest)]">Grass Roots</span>
                <br />
                <span className="text-white">Sports</span>
              </p>
            </div>
            <p className="text-[var(--color-muted)] text-sm">{tFooter('tagline')}</p>
          </div>

          <nav className="flex flex-col gap-2">
            {(
              [
                { href: `/${locale}`, key: 'home' },
                { href: `/${locale}/about`, key: 'about' },
                { href: `/${locale}/programs`, key: 'programs' },
                { href: `/${locale}/gallery`, key: 'gallery' },
                { href: `/${locale}/schedule`, key: 'schedule' },
                { href: `/${locale}/contact`, key: 'contact' },
              ] as const
            ).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-[var(--color-lime)] transition-colors"
              >
                {tNav(link.key)}
              </Link>
            ))}
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider mb-2">
              {tFooter('followUs')}
            </p>
            <a
              href="https://instagram.com/akdovey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-lime)] hover:text-white transition-colors"
            >
              @akdovey
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6">
          <p className="text-xs text-[var(--color-muted)]">{tFooter('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
