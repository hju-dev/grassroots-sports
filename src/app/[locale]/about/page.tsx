import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BasketballIcon, CommunityIcon, GrowthIcon } from '@/components/Icons';
import { sanityClient } from '@/sanity/lib/client';
import { SETTINGS_QUERY } from '@/sanity/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'About | Grass Roots Sports' : 'เกี่ยวกับเรา | Grass Roots Sports',
    description: isEn
      ? 'Learn about Grass Roots Sports — founded by Alex Dovey to bring community basketball to Pattaya, Thailand.'
      : 'เรียนรู้เกี่ยวกับ Grass Roots Sports ก่อตั้งโดย Alex Dovey เพื่อนำบาสเกตบอลชุมชนมาสู่พัทยา',
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
      <section className="bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">
            {cms(s?.aboutHeadlineEn, s?.aboutHeadlineTh, t('headline'))}
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            {cms(s?.aboutSubtitleEn, s?.aboutSubtitleTh, t('subtitle'))}
          </p>
        </div>
      </section>

      {/* Our Story Body */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-6 text-[var(--color-body)] leading-relaxed text-base md:text-lg">
          <p>{t('storyP1')}</p>
          <p>{t('storyP2')}</p>
          <p className="font-semibold text-[var(--color-black)]">{t('storyP3')}</p>
          <p>{t('storyP4')}</p>
          <p>{t('storyP5')}</p>
          <p>{t('storyP6')}</p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 md:py-20 px-4 bg-[var(--color-offwhite)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] text-center mb-10">
            {t('founderLabel')}
          </p>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-[var(--color-forest)] to-[var(--color-black)] flex items-center justify-center shadow-xl">
                <span className="text-white text-4xl md:text-5xl font-black tracking-tight">AD</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl text-[var(--color-black)] mb-1">{t('founderName')}</h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-forest)] mb-5">
                {t('founderRole')}
              </p>
              <p className="text-[var(--color-body)] leading-relaxed max-w-xl">
                {cms(s?.bioEn, s?.bioTh, t('founderBio'))}
              </p>
            </div>
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
