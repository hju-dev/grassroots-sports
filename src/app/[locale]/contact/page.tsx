import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import { sanityClient } from '@/sanity/lib/client';
import { SETTINGS_QUERY } from '@/sanity/lib/queries';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';
import HeroArcGlow from '@/components/HeroArcGlow';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Contact | Grass Roots Sports' : 'ติดต่อเรา | Grass Roots Sports',
    description: isEn
      ? 'Get in touch with Grass Roots Sports. Questions about programs, coaching, or joining our community in Pattaya.'
      : 'ติดต่อ Grass Roots Sports มีคำถามเกี่ยวกับโปรแกรม การโค้ช หรือการเข้าร่วมชุมชนของเราในพัทยา',
    alternates: buildAlternates(locale, '/contact'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, s] = await Promise.all([
    getTranslations('contact'),
    sanityClient.fetch(SETTINGS_QUERY).catch(() => null),
  ]);

  const en = locale === 'en';
  const cms = (enVal: string | null | undefined, thVal: string | null | undefined, fallback: string) =>
    (en ? enVal : thVal) || fallback;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <HeroArcGlow />
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">
            {cms(s?.contactHeadlineEn, s?.contactHeadlineTh, t('headline'))}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto">
            {cms(s?.contactSubtitleEn, s?.contactSubtitleTh, t('subtitle'))}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[var(--color-sage)] rounded-2xl p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-3">
                {t('locationTitle')}
              </p>
              <p className="font-bold text-[var(--color-black)] mb-1">
                {cms(s?.locationDescEn, s?.locationDescTh, t('locationDesc'))}
              </p>
              <p className="text-sm text-[var(--color-muted)]">
                {cms(s?.locationSubEn, s?.locationSubTh, t('locationSub'))}
              </p>
            </div>

            <div className="bg-[var(--color-sage)] rounded-2xl p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-3">
                {t('instagramTitle')}
              </p>
              <p className="text-sm text-[var(--color-muted)] mb-3">{t('instagramDesc')}</p>
              <a
                href={`https://instagram.com/${s?.instagramHandle || 'akdovey'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--color-forest)] hover:text-[var(--color-lime)] transition-colors"
              >
                @{s?.instagramHandle || 'akdovey'}
              </a>
            </div>
          </div>

          {/* Form */}
          <ContactForm />

        </div>
      </section>
    </>
  );
}
