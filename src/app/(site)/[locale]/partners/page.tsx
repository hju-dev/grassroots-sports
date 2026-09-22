import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PartnerIcon, TrendingUpIcon, CommunityIcon, BasketballIcon, TargetIcon, GrowthIcon } from '@/components/Icons';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Partners & Sponsorship | Grass Roots Sports' : 'พาร์ทเนอร์ | Grass Roots Sports',
    description: isEn
      ? 'Partner with Grass Roots Sports: sponsorship, investment, facility partnerships, and team opportunities in Pattaya, Thailand.'
      : 'เป็นพาร์ทเนอร์กับ Grass Roots Sports สปอนเซอร์ การลงทุน และโอกาสด้านกีฬาในพัทยา',
    alternates: buildAlternates(locale, '/partners'),
  };
}

const sponsorshipIcons = [GrowthIcon, BasketballIcon, TargetIcon, PartnerIcon] as const;
const teamRoleCount = 4;

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations('nav');
  const t = await getTranslations('partners');

  const sponsorshipTiers = sponsorshipIcons.map((Icon, i) => {
    const n = i + 1;
    return {
      Icon,
      title: t(`tier${n}Title` as Parameters<typeof t>[0]),
      desc: t(`tier${n}Desc` as Parameters<typeof t>[0]),
      badge: t(`tier${n}Badge` as Parameters<typeof t>[0]),
    };
  });

  const teamRoles = Array.from({ length: teamRoleCount }, (_, i) => {
    const n = i + 1;
    return {
      title: t(`role${n}Title` as Parameters<typeof t>[0]),
      desc: t(`role${n}Desc` as Parameters<typeof t>[0]),
    };
  });

  return (
    <>
      <Breadcrumbs items={[{ label: tNav('home'), href: `/${locale}` }, { label: tNav('partners') }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">{t('heroTitle')}</h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Why partner */}
      <section className="py-16 md:py-20 px-4 bg-[var(--color-offwhite)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-6">
            {t('opportunityLabel')}
          </p>
          <h2 className="text-3xl md:text-5xl text-[var(--color-black)] mb-6">
            {t('opportunityTitle')}
          </h2>
          <p className="text-[var(--color-body)] leading-relaxed mb-4">
            {t('opportunityDesc1')}
          </p>
          <p className="text-[var(--color-body)] leading-relaxed">
            {t('opportunityDesc2')}
          </p>
        </div>
      </section>

      {/* Sponsorship tiers */}
      <section className="py-16 md:py-20 px-4 bg-[var(--color-sage)]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] text-center mb-4">
            {t('sponsorshipLabel')}
          </p>
          <h2 className="text-3xl md:text-5xl text-[var(--color-black)] text-center mb-12">
            {t('sponsorshipTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsorshipTiers.map(({ Icon, title, desc, badge }) => (
              <div key={title} className="bg-white rounded-2xl p-7 shadow-sm flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <Icon className="w-10 h-10 text-[var(--color-forest)] flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider bg-[var(--color-forest)]/10 text-[var(--color-forest)] px-2.5 py-1 rounded-full">
                    {badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-black)]">{title}</h3>
                <p className="text-sm text-[var(--color-body)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--color-muted)] mt-8">
            {t('sponsorshipNote')}
          </p>
        </div>
      </section>

      {/* Facility partners */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-4">
            {t('facilitiesLabel')}
          </p>
          <h2 className="text-3xl md:text-4xl text-[var(--color-black)] mb-6">
            {t('facilitiesTitle')}
          </h2>
          <p className="text-[var(--color-body)] leading-relaxed mb-4">
            {t('facilitiesDesc1')}
          </p>
          <p className="text-[var(--color-body)] leading-relaxed">
            {t('facilitiesDesc2')}
          </p>
        </div>
      </section>

      {/* Investment */}
      <section id="invest" className="py-16 md:py-20 px-4 bg-[var(--color-black)] text-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] text-center mb-4">
            {t('investmentLabel')}
          </p>
          <h2 className="text-3xl md:text-5xl text-center mb-6">{t('investmentTitle')}</h2>
          <div className="space-y-4 text-white/80 leading-relaxed mb-10">
            <p>{t('investmentDesc1')}</p>
            <p>{t('investmentDesc2')}</p>
            <p>{t('investmentDesc3')}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="text-center bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white hover:text-[var(--color-black)] font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {t('getInTouchBtn')}
            </Link>
          </div>
        </div>
      </section>

      {/* Join the team */}
      <section id="team" className="py-16 md:py-20 px-4 bg-[var(--color-offwhite)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] text-center mb-4">
            {t('teamLabel')}
          </p>
          <h2 className="text-3xl md:text-5xl text-[var(--color-black)] text-center mb-4">
            {t('teamTitle')}
          </h2>
          <p className="text-center text-[var(--color-body)] mb-12 max-w-xl mx-auto">
            {t('teamDesc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {teamRoles.map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-[var(--color-black)]/5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <CommunityIcon className="w-7 h-7 text-[var(--color-forest)] flex-shrink-0" />
                  <h3 className="font-bold text-[var(--color-black)]">{title}</h3>
                </div>
                <p className="text-sm text-[var(--color-body)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--color-muted)] mt-8">
            {t('teamNote')}
          </p>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[var(--color-forest)] text-white py-14 md:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4">{t('ctaTitle')}</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-[var(--color-forest)] hover:bg-[var(--color-lime)] hover:text-[var(--color-black)] font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {t('contactUsBtn')}
            </Link>
            <a
              href="https://instagram.com/akdovey"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/50 hover:border-white text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {t('instagramCta')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
