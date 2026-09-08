import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import { getPayloadClient } from '@/lib/payload';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MapPinIcon } from '@/components/Icons';

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
  const payload = await getPayloadClient();
  const [t, tNav, s] = await Promise.all([
    getTranslations('contact'),
    getTranslations('nav'),
    payload.findGlobal({ slug: 'settings', locale: locale as 'en' | 'th' }).catch(() => null),
  ]);

  const cms = (val: string | null | undefined, fallback: string) => val || fallback;
  const instagramUrl =
    s?.socialLinks?.find((l) => l.platform === 'Instagram')?.url ||
    'https://instagram.com/akdovey';
  const instagramHandle = instagramUrl.replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '') || 'akdovey';

  return (
    <>
      <Breadcrumbs items={[{ label: tNav('home'), href: `/${locale}` }, { label: tNav('contact') }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">
            {cms(s?.contactHeadline, t('headline'))}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto">
            {cms(s?.contactSubtitle, t('subtitle'))}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[var(--color-sage)] rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-3">
                <MapPinIcon className="w-5 h-5 text-[var(--color-forest)]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)]">
                  {t('locationTitle')}
                </p>
              </div>
              <p className="font-bold text-[var(--color-black)] mb-1">
                {cms(s?.locationDesc, t('locationDesc'))}
              </p>
              <p className="text-sm text-[var(--color-muted)] mb-3">
                {cms(s?.locationSub, t('locationSub'))}
              </p>
              <p className="text-sm text-[var(--color-body)] leading-relaxed">
                {t('locationModel')}
              </p>
            </div>

            <div className="bg-[var(--color-sage)] rounded-2xl p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-3">
                {t('instagramTitle')}
              </p>
              <p className="text-sm text-[var(--color-muted)] mb-3">{t('instagramDesc')}</p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--color-forest)] hover:text-[var(--color-lime)] transition-colors"
              >
                @{instagramHandle}
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
