import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import RegistrationForm from '@/components/RegistrationForm';
import { getLinks } from '@/lib/content';
import { getRegistrationsOpen } from '@/lib/settings';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Register Interest | Grass Roots Sports' : 'ลงทะเบียนความสนใจ | Grass Roots Sports',
    description: isEn
      ? 'Register your interest in Grass Roots Sports programs. Be first to know when we launch in Pattaya, Thailand.'
      : 'ลงทะเบียนความสนใจในโปรแกรม Grass Roots Sports รู้เป็นคนแรกเมื่อเราเปิดตัวในพัทยา',
    alternates: buildAlternates(locale, '/register'),
    robots: { index: false }, // keep registration page out of search results for now
  };
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const [{ program }, t, isOpen, links] = await Promise.all([
    searchParams,
    getTranslations('register'),
    getRegistrationsOpen(),
    getLinks(),
  ]);

  const instagramUrl = links.instagram;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">{t('headline')}</h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-lg mx-auto">
          {isOpen ? (
            <RegistrationForm defaultProgram={program} />
          ) : (
            <div className="bg-[var(--color-sage)] rounded-2xl p-8 md:p-10 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--color-black)]/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[var(--color-black)]/50">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-black)]">{t('closedTitle')}</h2>
              <p className="text-[var(--color-body)] leading-relaxed">{t('closedDesc')}</p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white hover:text-[var(--color-black)] font-bold py-3 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
              >
                {t('closedCta')}
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
