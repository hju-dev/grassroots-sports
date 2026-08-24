import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { BasketballIcon, CommunityIcon, GrowthIcon } from '@/components/Icons';
import { sanityClient } from '@/sanity/lib/client';
import { SETTINGS_QUERY } from '@/sanity/lib/queries';
import CourtLines from '@/components/CourtLines';
import { buildAlternates } from '@/lib/seo';

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
  const [t, s] = await Promise.all([
    getTranslations('about'),
    sanityClient.fetch(SETTINGS_QUERY).catch(() => null),
  ]);

  const en = locale === 'en';
  const cms = (enVal: string | null | undefined, thVal: string | null | undefined, fallback: string) =>
    (en ? enVal : thVal) || fallback;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient text-white py-16 md:py-24 px-4">
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">
            {cms(s?.aboutHeadlineEn, s?.aboutHeadlineTh, t('headline'))}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            {cms(s?.aboutSubtitleEn, s?.aboutSubtitleTh, t('subtitle'))}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 px-4 bg-[var(--color-offwhite)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] text-center mb-10">
            Our Story
          </p>
          <div className="space-y-6 text-[var(--color-body)]">
            <p className="text-xl md:text-2xl font-semibold text-[var(--color-black)] leading-snug">
              Grass Roots Sports wasn&apos;t created overnight. It&apos;s the product of more than 15 years of coaching, learning, and building relationships through sport.
            </p>
            <p className="leading-relaxed">
              From the United States to Spain, Thailand, Vietnam, and China, every community has offered new ideas about coaching, player development, competition, and the role sport plays in bringing people together. Along the way, one lesson has remained constant: the strongest sporting communities are built when everyone has the opportunity to participate.
            </p>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden my-2">
              <Image
                src="/images/community-group.webp"
                alt="Grass Roots Sports community: players and coaches together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="leading-relaxed font-medium text-[var(--color-black)]">
              That belief became the foundation of Grass Roots Sports.
            </p>
            <p className="leading-relaxed">
              Our vision is to make quality sport more accessible while creating opportunities for athletes of all ages and abilities. We are committed to providing high-level coaching and professional training environments for those who want to compete, while ensuring that beginners, recreational players, and families always have an affordable and welcoming place to start. We believe there should never be an age limit on enjoying sport or becoming part of a sporting community.
            </p>
            <p className="leading-relaxed">
              Looking beyond our own programs, we hope to help strengthen the sporting landscape across Thailand by supporting the development of local facilities, improving access to equipment, and working alongside schools, clubs, businesses, and community organisations to create more opportunities for participation.
            </p>
            <p className="leading-relaxed">
              As Grass Roots Sports continues to grow, so will the team behind it. What began as one person&apos;s vision has already been shaped by countless coaches, players, educators, parents, and community leaders. In the years ahead, we aim to build a board of experienced community leaders, sporting professionals, and investment partners who share our commitment to creating something that will benefit generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* Why Grass Roots */}
      <section className="bg-[var(--color-sage)] py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-12 text-[var(--color-black)]">
            {cms(s?.whyTitleEn, s?.whyTitleTh, t('whyTitle'))}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { Icon: BasketballIcon, enTitle: s?.why1TitleEn, thTitle: s?.why1TitleTh, enDesc: s?.why1DescEn, thDesc: s?.why1DescTh, ftTitle: t('why1Title'), ftDesc: t('why1Desc') },
              { Icon: CommunityIcon, enTitle: s?.why2TitleEn, thTitle: s?.why2TitleTh, enDesc: s?.why2DescEn, thDesc: s?.why2DescTh, ftTitle: t('why2Title'), ftDesc: t('why2Desc') },
              { Icon: GrowthIcon, enTitle: s?.why3TitleEn, thTitle: s?.why3TitleTh, enDesc: s?.why3DescEn, thDesc: s?.why3DescTh, ftTitle: t('why3Title'), ftDesc: t('why3Desc') },
            ]).map(({ Icon, enTitle, thTitle, enDesc, thDesc, ftTitle, ftDesc }, i) => (
              <div key={i} className="bg-white rounded-xl p-7 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  <Icon className="w-11 h-11 text-[var(--color-forest)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-black)] mb-2">
                  {cms(enTitle, thTitle, ftTitle)}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {cms(enDesc, thDesc, ftDesc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming to Pattaya */}
      <section className="bg-[var(--color-black)] text-white py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-5">
            {cms(s?.comingTitleEn, s?.comingTitleTh, t('comingTitle'))}
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            {cms(s?.comingDescEn, s?.comingDescTh, t('comingDesc'))}
          </p>
          <a
            href={`https://instagram.com/${s?.instagramHandle || 'akdovey'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
          >
            {t('instagramCta')}
          </a>
        </div>
      </section>
    </>
  );
}
