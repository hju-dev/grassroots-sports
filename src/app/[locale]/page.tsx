import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import {
  BasketballIcon,
  CommunityIcon,
  GrowthIcon,
  LightningIcon,
  TrophyIcon,
  TargetIcon,
  PartnerIcon,
  TrendingUpIcon,
} from '@/components/Icons';
import { sanityClient } from '@/sanity/lib/client';
import { SETTINGS_QUERY } from '@/sanity/lib/queries';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: 'Grass Roots Sports | Basketball Academy Pattaya',
    description: isEn
      ? 'Community basketball coaching, leagues, and development programs for all ages in Pattaya, Thailand.'
      : 'โค้ชบาสเกตบอล ลีก และโปรแกรมพัฒนานักกีฬาทุกวัยในพัทยา ประเทศไทย',
    alternates: buildAlternates(locale),
    openGraph: {
      title: 'Grass Roots Sports',
      description: isEn ? 'Basketball for everyone. Coming to Pattaya, Thailand.' : 'บาสเกตบอลสำหรับทุกคน กำลังมาถึงพัทยา',
      images: [{ url: '/logo.jpg', width: 800, height: 800, alt: 'Grass Roots Sports' }],
    },
  };
}

const programs = [
  { id: 'youth', Icon: BasketballIcon },
  { id: 'teen', Icon: LightningIcon },
  { id: 'adult', Icon: TrophyIcon },
  { id: 'private', Icon: TargetIcon },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, tp, s] = await Promise.all([
    getTranslations('home'),
    getTranslations('programs'),
    sanityClient.fetch(SETTINGS_QUERY).catch(() => null),
  ]);

  const en = locale === 'en';
  const cms = (enKey: keyof typeof s, thKey: keyof typeof s, fallback: string) =>
    (en ? s?.[enKey] : s?.[thKey]) || fallback;

  const programCards = [
    { id: 'youth', Icon: BasketballIcon, title: tp('youthTitle'), ages: tp('youthAges') },
    { id: 'teen', Icon: LightningIcon, title: tp('teenTitle'), ages: tp('teenAges') },
    { id: 'adult', Icon: TrophyIcon, title: tp('adultTitle'), ages: tp('adultAges') },
    { id: 'private', Icon: TargetIcon, title: tp('privateTitle'), ages: tp('privateAges') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient text-white py-16 md:py-28 px-4">
        <CourtLines className="text-white/10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/logo.png" alt="Grass Roots Sports" fill className="object-contain" sizes="(max-width: 768px) 160px, 208px" priority />
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl mb-5">
            {cms('heroHeadlineEn', 'heroHeadlineTh', t('headline'))}
          </h1>
          <p className="text-base md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {cms('heroSubheadlineEn', 'heroSubheadlineTh', t('subheadline'))}
          </p>
          <Link
            href={`/${locale}/programs`}
            className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 px-8 md:py-4 md:px-10 rounded-lg transition-colors text-sm md:text-base uppercase tracking-widest"
          >
            {t('cta')}
          </Link>
        </div>
      </section>

      {/* Photo strip */}
      <section className="px-4 py-6 bg-[var(--color-black)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { src: '/images/team-huddle.webp',  alt: 'Grassroots Sports team' },
            { src: '/images/game-action.webp',  alt: 'Game action' },
            { src: '/images/coach-huddle.webp', alt: 'Coaching session' },
          ].map((photo) => (
            <div key={photo.src} className="relative aspect-video overflow-hidden rounded-xl">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      {/* Mission strip */}
      <section className="bg-[var(--color-sage)] py-14 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-10 md:mb-12 text-[var(--color-black)]">
            {cms('missionTitleEn', 'missionTitleTh', t('missionTitle'))}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {([
              { Icon: BasketballIcon, tKey: 'mission1', enTitle: 'mission1TitleEn' as const, thTitle: 'mission1TitleTh' as const, enDesc: 'mission1DescEn' as const, thDesc: 'mission1DescTh' as const },
              { Icon: CommunityIcon, tKey: 'mission2', enTitle: 'mission2TitleEn' as const, thTitle: 'mission2TitleTh' as const, enDesc: 'mission2DescEn' as const, thDesc: 'mission2DescTh' as const },
              { Icon: GrowthIcon, tKey: 'mission3', enTitle: 'mission3TitleEn' as const, thTitle: 'mission3TitleTh' as const, enDesc: 'mission3DescEn' as const, thDesc: 'mission3DescTh' as const },
            ] as const).map(({ Icon, tKey, enTitle, thTitle, enDesc, thDesc }) => (
              <div key={tKey} className="text-center p-5 md:p-6">
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-[var(--color-forest)]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--color-black)] mb-2">
                  {cms(enTitle, thTitle, t(`${tKey}Title` as Parameters<typeof t>[0]))}
                </h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                  {cms(enDesc, thDesc, t(`${tKey}Desc` as Parameters<typeof t>[0]))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs preview */}
      <section className="py-14 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-3 text-[var(--color-black)]">
            {t('programsTitle')}
          </h2>
          <p className="text-center text-[var(--color-muted)] mb-8 md:mb-10 text-sm md:text-base">
            {t('programsSubtitle')}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {programCards.map(({ id, Icon, title, ages }) => (
              <div key={id} className="bg-[var(--color-sage)] rounded-xl p-5 md:p-6 flex flex-col items-center text-center">
                <div className="mb-3">
                  <Icon className="w-10 h-10 text-[var(--color-forest)]" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-[var(--color-black)] mb-1">{title}</h3>
                <p className="text-xs text-[var(--color-muted)] mb-4">{ages}</p>
                <span className="text-xs bg-[var(--color-lime)] text-white font-bold py-1 px-3 rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-10">
            <Link
              href={`/${locale}/programs`}
              className="inline-block border-2 border-[var(--color-forest)] text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-white font-bold py-3 px-8 rounded-lg transition-colors uppercase tracking-wider text-sm"
            >
              {t('programsCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-14 md:py-16 px-4 bg-[var(--color-offwhite)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-3 text-[var(--color-black)]">
            Get Involved
          </h2>
          <p className="text-center text-[var(--color-muted)] mb-10 text-sm md:text-base max-w-xl mx-auto">
            There are many ways to be part of Grass Roots Sports, as a player, a partner, an investor, or a member of the team.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              {
                Icon: BasketballIcon,
                title: 'Play',
                desc: 'Register your interest in any program, for all ages and abilities.',
                href: `/${locale}/register`,
                cta: 'Register now',
              },
              {
                Icon: PartnerIcon,
                title: 'Partner',
                desc: 'Sponsor a program or become a business, facility, or community partner.',
                href: `/${locale}/partners`,
                cta: 'Partner with us',
              },
              {
                Icon: TrendingUpIcon,
                title: 'Invest',
                desc: 'We are seeking investment partners who share our long-term vision.',
                href: `/${locale}/partners#invest`,
                cta: 'Find out more',
              },
              {
                Icon: CommunityIcon,
                title: 'Join the Team',
                desc: 'Coaching, coordination, and community roles as we launch and grow.',
                href: `/${locale}/partners#team`,
                cta: 'See opportunities',
              },
            ] as const).map(({ Icon, title, desc, href, cta }) => (
              <div key={title} className="bg-white rounded-xl p-6 flex flex-col gap-3 shadow-sm border border-[var(--color-black)]/5">
                <Icon className="w-10 h-10 text-[var(--color-forest)]" />
                <h3 className="text-lg font-bold text-[var(--color-black)]">{title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1">{desc}</p>
                <Link
                  href={href}
                  className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] hover:text-[var(--color-lime)] transition-colors"
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-[var(--color-black)] text-white py-14 md:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-white/20 bg-white">
            <Image src="/logo.png" alt="Grass Roots Sports" fill className="object-contain" sizes="80px" />
          </div>
          <h2 className="text-3xl md:text-6xl mb-4">
            {cms('igSectionTitleEn', 'igSectionTitleTh', t('instagramTitle'))}
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed text-sm md:text-base">
            {cms('igSectionSubtitleEn', 'igSectionSubtitleTh', t('instagramSubtitle'))}
          </p>
          <a
            href={`https://instagram.com/${s?.instagramHandle || 'akdovey'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 px-8 rounded-lg transition-colors text-sm md:text-base uppercase tracking-widest"
          >
            {t('instagramCta')}
          </a>
        </div>
      </section>
    </>
  );
}
