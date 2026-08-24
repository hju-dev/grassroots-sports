import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  BasketballIcon,
  CommunityIcon,
  GrowthIcon,
  LightningIcon,
  TrophyIcon,
  TargetIcon,
} from '@/components/Icons';
import { sanityClient } from '@/sanity/lib/client';
import { PROGRAM_QUERY } from '@/sanity/lib/queries';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';

const validPrograms = ['youth', 'teen', 'adult', 'private'] as const;
type Program = (typeof validPrograms)[number];

type IconComponent = React.FC<{ className?: string }>;

const programIcons: Record<Program, [IconComponent, IconComponent, IconComponent, IconComponent]> = {
  youth: [BasketballIcon, TrophyIcon, GrowthIcon, CommunityIcon],
  teen: [LightningIcon, CommunityIcon, TargetIcon, BasketballIcon],
  adult: [CommunityIcon, BasketballIcon, TrophyIcon, GrowthIcon],
  private: [TargetIcon, GrowthIcon, LightningIcon, CommunityIcon],
};

export function generateStaticParams() {
  return validPrograms.map((program) => ({ program }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; program: string }> }): Promise<Metadata> {
  const { locale, program } = await params;
  if (!validPrograms.includes(program as Program)) return {};

  const p = program as Program;
  const [t, sanityData] = await Promise.all([
    getTranslations('programDetail'),
    sanityClient.fetch(PROGRAM_QUERY, { slug: p }).catch(() => null),
  ]);
  const en = locale === 'en';
  const d = (key: string): string => (t as unknown as (k: string) => string)(`${p}.${key}`);

  const hero = (en ? sanityData?.heroEn : sanityData?.heroTh) || d('hero');
  const tagline = (en ? sanityData?.taglineEn : sanityData?.taglineTh) || d('tagline');
  const overview = (en ? sanityData?.overviewEn : sanityData?.overviewTh) || d('overview');

  return {
    title: `${hero} | Grass Roots Sports`,
    description: overview.slice(0, 155),
    alternates: buildAlternates(locale, `/programs/${p}`),
    openGraph: {
      title: `${hero} | Grass Roots Sports`,
      description: tagline,
      images: [{ url: '/logo.jpg', width: 800, height: 800, alt: 'Grass Roots Sports' }],
    },
  };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ locale: string; program: string }> }) {
  const { locale, program } = await params;

  if (!validPrograms.includes(program as Program)) notFound();

  const p = program as Program;
  const [t, sanityData] = await Promise.all([
    getTranslations('programDetail'),
    sanityClient.fetch(PROGRAM_QUERY, { slug: p }).catch(() => null),
  ]);

  const icons = programIcons[p];
  const en = locale === 'en';

  const d = (key: string): string => (t as unknown as (k: string) => string)(`${p}.${key}`);
  const cms = (enVal: string | null | undefined, thVal: string | null | undefined, fallback: string) =>
    (en ? enVal : thVal) || fallback;

  const s = sanityData;
  const hero = cms(s?.heroEn, s?.heroTh, d('hero'));
  const tagline = cms(s?.taglineEn, s?.taglineTh, d('tagline'));
  const ages = cms(s?.agesEn, s?.agesTh, d('ages'));
  const overview = cms(s?.overviewEn, s?.overviewTh, d('overview'));
  const philosophyLabel = cms(s?.philosophyLabelEn, s?.philosophyLabelTh, d('philosophyLabel'));
  const philosophy = cms(s?.philosophyEn, s?.philosophyTh, d('philosophy'));
  const learnTitle = cms(s?.learnTitleEn, s?.learnTitleTh, d('learnTitle'));
  const formatTitle = cms(s?.formatTitleEn, s?.formatTitleTh, d('formatTitle'));
  const formatDesc = cms(s?.formatDescEn, s?.formatDescTh, d('formatDesc'));
  const forTitle = cms(s?.forTitleEn, s?.forTitleTh, d('forTitle'));
  const forDesc = cms(s?.forDescEn, s?.forDescTh, d('forDesc'));
  const pathwayLabel = cms(s?.pathwayLabelEn, s?.pathwayLabelTh, d('pathwayLabel'));
  const pathway = cms(s?.pathwayEn, s?.pathwayTh, d('pathway'));
  const ctaTitle = cms(s?.ctaTitleEn, s?.ctaTitleTh, d('ctaTitle'));
  const ctaDesc = cms(s?.ctaDescEn, s?.ctaDescTh, d('ctaDesc'));
  const ctaBtn = d('cta');

  const learnCards = ([1, 2, 3, 4] as const).map((n, i) => ({
    Icon: icons[i],
    title: cms((s as Record<string, string | null | undefined>)?.[`learn${n}TitleEn`], (s as Record<string, string | null | undefined>)?.[`learn${n}TitleTh`], d(`learn${n}Title`)),
    desc: cms((s as Record<string, string | null | undefined>)?.[`learn${n}DescEn`], (s as Record<string, string | null | undefined>)?.[`learn${n}DescTh`], d(`learn${n}Desc`)),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-28 px-4">
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href={`/${locale}/programs`}
            className="flex w-fit items-center gap-2 text-white/60 hover:text-white text-sm uppercase tracking-wider mb-6 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
              <path d="M10 3L5 8l5 5" />
            </svg>
            {t('backBtn')}
          </Link>
          <span className="inline-block bg-[var(--color-lime)] text-white text-xs font-bold py-1.5 px-4 rounded-full uppercase tracking-widest mb-5">
            {ages}
          </span>
          <h1 className="text-5xl md:text-8xl mb-4">{hero}</h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl leading-relaxed">{tagline}</p>
          <div className="mt-10">
            <Link
              href={`/${locale}/register?program=${p}`}
              className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] border border-white/20 text-white font-bold py-4 px-10 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {ctaBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Overview + Philosophy */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <p className="text-[var(--color-body)] text-lg leading-relaxed">{overview}</p>
          </div>
          <div className="bg-[var(--color-sage)] rounded-2xl p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-3">
              {philosophyLabel}
            </p>
            <p className="text-[var(--color-body)] leading-relaxed italic">
              &ldquo;{philosophy}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="bg-[var(--color-sage)] py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-[var(--color-black)] mb-10 md:mb-12">{learnTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {learnCards.map(({ Icon, title, desc }, i) => (
              <div key={i} className="bg-white rounded-2xl p-7">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-forest)]/10 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-[var(--color-forest)]" />
                </div>
                <h3 className="font-bold text-[var(--color-black)] text-lg mb-2">{title}</h3>
                <p className="text-[var(--color-body)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Format + Who It's For */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-black)] mb-4">{formatTitle}</h2>
            <p className="text-[var(--color-body)] leading-relaxed">{formatDesc}</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-black)] mb-4">{forTitle}</h2>
            <p className="text-[var(--color-body)] leading-relaxed">{forDesc}</p>
          </div>
        </div>
      </section>

      {/* Pathway banner */}
      {pathwayLabel && (
        <section className="bg-[var(--color-forest)] text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-lime)] mb-3">
              {pathwayLabel}
            </p>
            <p className="text-white/90 leading-relaxed max-w-3xl">{pathway}</p>
          </div>
        </section>
      )}

      {/* Register CTA */}
      <section className="bg-[var(--color-black)] text-white py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-4">{ctaTitle}</h2>
          <p className="text-white/70 mb-8 leading-relaxed">{ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/register?program=${p}`}
              className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {ctaBtn}
            </Link>
            <Link
              href={`/${locale}/programs`}
              className="inline-block border border-white/30 hover:border-white text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {t('backBtn')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
