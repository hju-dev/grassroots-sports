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
} from '@/components/Icons';

const programs = [
  { id: 'youth', Icon: BasketballIcon, title: 'Youth Basketball', ages: 'Ages 6-12' },
  { id: 'teen', Icon: LightningIcon, title: 'Teen Academy', ages: 'Ages 13-17' },
  { id: 'adult', Icon: TrophyIcon, title: 'Adult Leagues', ages: 'All Adults' },
  { id: 'private', Icon: TargetIcon, title: 'Private Coaching', ages: 'All Ages' },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/logo.jpg"
              alt="Grass Roots Sports"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 160px, 208px"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl mb-5">{t('headline')}</h1>
          <p className="text-base md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('subheadline')}
          </p>
          <Link
            href={`/${locale}/programs`}
            className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 px-8 md:py-4 md:px-10 rounded-lg transition-colors text-sm md:text-base uppercase tracking-widest"
          >
            {t('cta')}
          </Link>
        </div>
      </section>

      {/* Mission strip */}
      <section className="bg-[var(--color-sage)] py-14 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-10 md:mb-12 text-[var(--color-black)]">
            {t('missionTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-5 md:p-6">
              <div className="flex justify-center mb-4">
                <BasketballIcon className="w-12 h-12 text-[var(--color-forest)]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[var(--color-black)] mb-2">
                {t('mission1Title')}
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {t('mission1Desc')}
              </p>
            </div>
            <div className="text-center p-5 md:p-6">
              <div className="flex justify-center mb-4">
                <CommunityIcon className="w-12 h-12 text-[var(--color-forest)]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[var(--color-black)] mb-2">
                {t('mission2Title')}
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {t('mission2Desc')}
              </p>
            </div>
            <div className="text-center p-5 md:p-6">
              <div className="flex justify-center mb-4">
                <GrowthIcon className="w-12 h-12 text-[var(--color-forest)]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[var(--color-black)] mb-2">
                {t('mission3Title')}
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {t('mission3Desc')}
              </p>
            </div>
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
            {programs.map(({ id, Icon, title, ages }) => (
              <div
                key={id}
                className="bg-[var(--color-sage)] rounded-xl p-5 md:p-6 flex flex-col items-center text-center"
              >
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

      {/* Instagram CTA */}
      <section className="bg-[var(--color-black)] text-white py-14 md:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-white/20">
            <Image
              src="/logo.jpg"
              alt="Grass Roots Sports"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <h2 className="text-3xl md:text-6xl mb-4">{t('instagramTitle')}</h2>
          <p className="text-white/70 mb-8 leading-relaxed text-sm md:text-base">
            {t('instagramSubtitle')}
          </p>
          <a
            href="https://instagram.com/akdovey"
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
