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
import { getPayloadClient } from '@/lib/payload';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';
import HeroArcGlow from '@/components/HeroArcGlow';
import { getSlotImages } from '@/lib/image-slots';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const share = (await getSlotImages(isEn ? 'en' : 'th')).social_share;
  return {
    title: 'Grass Roots Sports | Basketball Academy Pattaya',
    description: isEn
      ? 'Community basketball coaching, leagues, and development programs for all ages in Pattaya, Thailand.'
      : 'โค้ชบาสเกตบอล ลีก และโปรแกรมพัฒนานักกีฬาทุกวัยในพัทยา ประเทศไทย',
    alternates: buildAlternates(locale),
    openGraph: {
      title: 'Grass Roots Sports',
      description: isEn ? 'Basketball for everyone. Coming to Pattaya, Thailand.' : 'บาสเกตบอลสำหรับทุกคน กำลังมาถึงพัทยา',
      images: [{ url: share.src, width: share.width, height: share.height, alt: share.alt }],
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
  const payload = await getPayloadClient();
  const [t, tp, s, slots] = await Promise.all([
    getTranslations('home'),
    getTranslations('programs'),
    payload.findGlobal({ slug: 'settings', locale: locale as 'en' | 'th' }).catch(() => null),
    getSlotImages(locale === 'th' ? 'th' : 'en'),
  ]);

  const cms = (val: string | null | undefined, fallback: string) => val || fallback;
  const instagramUrl =
    s?.socialLinks?.find((l) => l.platform === 'Instagram')?.url ||
    'https://instagram.com/akdovey';
  const missionIcons = [BasketballIcon, CommunityIcon, GrowthIcon];

  const programCards = [
    { id: 'youth', Icon: BasketballIcon, title: tp('youthTitle'), ages: tp('youthAges') },
    { id: 'teen', Icon: LightningIcon, title: tp('teenTitle'), ages: tp('teenAges') },
    { id: 'adult', Icon: TrophyIcon, title: tp('adultTitle'), ages: tp('adultAges') },
    { id: 'private', Icon: TargetIcon, title: tp('privateTitle'), ages: tp('privateAges') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white px-4 pt-16 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
        <HeroArcGlow />
        <CourtLines className="text-white/10" />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto lg:mx-0 mb-6 rounded-xl overflow-hidden shadow-lg">
              <Image src={slots.site_logo.src} alt={slots.site_logo.alt} fill className="object-contain" sizes="80px" priority />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-5">
              {cms(s?.heroHeadline, t('headline'))}
            </h1>
            <p className="text-base md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {cms(s?.heroSubheadline, t('subheadline'))}
            </p>
            <Link
              href={`/${locale}/programs`}
              className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white hover:text-[var(--color-black)] font-bold py-3.5 px-8 md:py-4 md:px-10 rounded-lg transition-colors text-sm md:text-base uppercase tracking-widest"
            >
              {t('cta')}
            </Link>
          </div>
          <div className="relative w-full aspect-[4/5] max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <Image
              src={slots.home_hero_photo.src}
              alt={slots.home_hero_photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="px-4 py-6 bg-[var(--color-black)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[slots.home_strip_left, slots.home_strip_right].map((photo, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-xl">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
          ))}
        </div>
      </section>

      {/* Mission strip */}
      <section className="bg-[var(--color-sage)] py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-start">
          <h2 className="text-3xl md:text-5xl text-[var(--color-black)]">
            {cms(s?.missionTitle, t('missionTitle'))}
          </h2>
          <div className="flex flex-col gap-8">
            {(['mission1', 'mission2', 'mission3'] as const).map((tKey, i) => {
              const card = s?.missionCards?.[i];
              const Icon = missionIcons[i];
              return (
                <div key={tKey} className="flex gap-4 items-start">
                  <Icon className="w-9 h-9 text-[var(--color-forest)] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[var(--color-black)] mb-1">
                      {cms(card?.title, t(`${tKey}Title` as Parameters<typeof t>[0]))}
                    </h3>
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                      {cms(card?.description, t(`${tKey}Desc` as Parameters<typeof t>[0]))}
                    </p>
                  </div>
                </div>
              );
            })}
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
                <span className="text-xs bg-[var(--color-lime)] text-[var(--color-black)] font-bold py-1 px-3 rounded-full uppercase tracking-wider">
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
      <section className="py-14 md:py-20 px-4 bg-[var(--color-sage)]">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl mb-10 md:mb-12">
            <h2 className="text-3xl md:text-5xl text-[var(--color-black)] mb-3">
              {t('involvedTitle')}
            </h2>
            <p className="text-[var(--color-muted)] text-sm md:text-base">
              {t('involvedSubtitle')}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--color-forest)] text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
              <BasketballIcon className="w-12 h-12 text-[var(--color-lime)] flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-1">{t('involvedPlayTitle')}</h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                  {t('involvedPlayDesc')}
                </p>
              </div>
              <Link
                href={`/${locale}/register`}
                className="inline-block bg-[var(--color-lime)] hover:bg-white text-[var(--color-black)] font-bold py-3 px-6 rounded-lg transition-colors text-sm uppercase tracking-widest whitespace-nowrap w-fit"
              >
                {t('involvedPlayCta')}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {([
                {
                  Icon: PartnerIcon,
                  title: t('involvedPartnerTitle'),
                  desc: t('involvedPartnerDesc'),
                  href: `/${locale}/partners`,
                  cta: t('involvedPartnerCta'),
                },
                {
                  Icon: TrendingUpIcon,
                  title: t('involvedInvestTitle'),
                  desc: t('involvedInvestDesc'),
                  href: `/${locale}/partners#invest`,
                  cta: t('involvedInvestCta'),
                },
                {
                  Icon: CommunityIcon,
                  title: t('involvedTeamTitle'),
                  desc: t('involvedTeamDesc'),
                  href: `/${locale}/partners#team`,
                  cta: t('involvedTeamCta'),
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
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-[var(--color-black)] text-white py-14 md:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-white/20 bg-white">
            <Image src={slots.site_logo.src} alt={slots.site_logo.alt} fill className="object-contain" sizes="80px" />
          </div>
          <h2 className="text-3xl md:text-6xl mb-4">
            {cms(s?.igSectionTitle, t('instagramTitle'))}
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed text-sm md:text-base">
            {cms(s?.igSectionSubtitle, t('instagramSubtitle'))}
          </p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white hover:text-[var(--color-black)] font-bold py-3.5 px-8 rounded-lg transition-colors text-sm md:text-base uppercase tracking-widest"
          >
            {t('instagramCta')}
          </a>
        </div>
      </section>
    </>
  );
}
