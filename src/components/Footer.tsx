import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function Footer({ locale }: { locale: string }) {
  const tNav = await getTranslations('nav');
  const tFooter = await getTranslations('footer');

  return (
    <footer className="bg-[var(--color-black)] text-white/80 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-10 md:gap-16 text-center md:text-left">
          <div className="max-w-xs mx-auto md:mx-0">
            <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-white">
                <Image
                  src="/logo.png"
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

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2.5 justify-center md:justify-start">
            {(
              [
                { href: `/${locale}`, key: 'home' },
                { href: `/${locale}/about`, key: 'about' },
                { href: `/${locale}/programs`, key: 'programs' },
                { href: `/${locale}/gallery`, key: 'gallery' },
                { href: `/${locale}/schedule`, key: 'schedule' },
                { href: `/${locale}/partners`, key: 'partners' },
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

          <div className="flex flex-col items-center md:items-start gap-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{tFooter('followUs')}</p>
            <a
              href="https://instagram.com/akdovey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-2.5 px-6 rounded-lg transition-colors uppercase tracking-widest text-xs"
            >
              {tFooter('instagramCta')}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6 text-center">
          <p className="text-xs text-[var(--color-muted)]">
            {tFooter('copyright')} · Built by{' '}
            <a href="https://hju-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">hju-dev</a>
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href={`/${locale}/privacy`} className="text-xs text-[var(--color-muted)] hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href={`/${locale}/terms`} className="text-xs text-[var(--color-muted)] hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
