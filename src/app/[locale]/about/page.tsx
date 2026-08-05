import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { BasketballIcon, CommunityIcon, GrowthIcon } from '@/components/Icons';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('about');

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">{t('headline')}</h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
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
              <h2 className="text-3xl md:text-4xl text-[var(--color-black)] mb-1">
                {t('founderName')}
              </h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-forest)] mb-5">
                {t('founderRole')}
              </p>
              <p className="text-[var(--color-body)] leading-relaxed max-w-xl">{t('founderBio')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Grass Roots */}
      <section className="bg-[var(--color-sage)] py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-12 text-[var(--color-black)]">
            {t('whyTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-7 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <BasketballIcon className="w-11 h-11 text-[var(--color-forest)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-black)] mb-2">{t('why1Title')}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">{t('why1Desc')}</p>
            </div>
            <div className="bg-white rounded-xl p-7 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <CommunityIcon className="w-11 h-11 text-[var(--color-forest)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-black)] mb-2">{t('why2Title')}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">{t('why2Desc')}</p>
            </div>
            <div className="bg-white rounded-xl p-7 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <GrowthIcon className="w-11 h-11 text-[var(--color-forest)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-black)] mb-2">{t('why3Title')}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">{t('why3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming to Pattaya */}
      <section className="bg-[var(--color-black)] text-white py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-5">{t('comingTitle')}</h2>
          <p className="text-white/70 mb-8 leading-relaxed">{t('comingDesc')}</p>
          <a
            href="https://instagram.com/akdovey"
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
