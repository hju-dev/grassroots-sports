import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { BasketballIcon, CommunityIcon, GrowthIcon } from '@/components/Icons';
import { getLinks } from '@/lib/content';
import CourtLines from '@/components/CourtLines';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildAlternates } from '@/lib/seo';
import { getSlotImages } from '@/lib/image-slots';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'About | Grass Roots Sports' : 'เกี่ยวกับเรา | Grass Roots Sports',
    description: isEn
      ? 'The story behind Grass Roots Sports: building accessible, community-driven sport in Pattaya, Thailand.'
      : 'เรื่องราวของ Grass Roots Sports สร้างกีฬาที่เข้าถึงได้และขับเคลื่อนโดยชุมชนในพัทยา',
    alternates: buildAlternates(locale, '/about'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, tNav, slots, links] = await Promise.all([
    getTranslations('about'),
    getTranslations('nav'),
    getSlotImages(locale === 'th' ? 'th' : 'en'),
    getLinks(),
  ]);

  const instagramUrl = links.instagram;

  return (
    <>
      <Breadcrumbs items={[{ label: tNav('home'), href: `/${locale}` }, { label: tNav('about') }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">
            {t('headline')}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 px-4 bg-[var(--color-offwhite)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] text-center mb-10">
            {t('storyLabel')}
          </p>
          <div className="space-y-6 text-[var(--color-body)]">
            <p className="text-xl md:text-2xl font-semibold text-[var(--color-black)] leading-snug">
              {t('story1')}
            </p>
            <p className="leading-relaxed">
              {t('story2')}
            </p>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden my-2">
              <Image
                src={slots.about_story_photo.src}
                alt={slots.about_story_photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="leading-relaxed font-medium text-[var(--color-black)]">
              {t('story3')}
            </p>
            <p className="leading-relaxed">
              {t('story4')}
            </p>
            <p className="leading-relaxed">
              {t('story5')}
            </p>
            <p className="leading-relaxed">
              {t('story6')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Grass Roots */}
      <section className="bg-[var(--color-sage)] py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src={slots.about_why_photo.src}
              alt={slots.about_why_photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl mb-8 text-[var(--color-black)]">
              {t('whyTitle')}
            </h2>
            <div className="flex flex-col divide-y divide-[var(--color-black)]/10">
              {([BasketballIcon, CommunityIcon, GrowthIcon] as const).map((Icon, i) => {
                const n = i + 1;
                return (
                  <div key={i} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                    <Icon className="w-8 h-8 shrink-0 text-[var(--color-forest)]" />
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-black)] mb-1">
                        {t(`why${n}Title` as Parameters<typeof t>[0])}
                      </h3>
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                        {t(`why${n}Desc` as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Coming to Pattaya */}
      <section className="bg-[var(--color-black)] text-white py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-5">
            {t('comingTitle')}
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            {t('comingDesc')}
          </p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white hover:text-[var(--color-black)] font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
          >
            {t('instagramCta')}
          </a>
        </div>
      </section>
    </>
  );
}
