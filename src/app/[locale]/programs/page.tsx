import { getTranslations } from 'next-intl/server';
import { BasketballIcon, LightningIcon, TrophyIcon, TargetIcon } from '@/components/Icons';

export default async function ProgramsPage() {
  const t = await getTranslations('programs');

  const programs = [
    {
      id: 'youth',
      Icon: BasketballIcon,
      titleKey: 'youthTitle' as const,
      agesKey: 'youthAges' as const,
      descKey: 'youthDesc' as const,
    },
    {
      id: 'teen',
      Icon: LightningIcon,
      titleKey: 'teenTitle' as const,
      agesKey: 'teenAges' as const,
      descKey: 'teenDesc' as const,
    },
    {
      id: 'adult',
      Icon: TrophyIcon,
      titleKey: 'adultTitle' as const,
      agesKey: 'adultAges' as const,
      descKey: 'adultDesc' as const,
    },
    {
      id: 'private',
      Icon: TargetIcon,
      titleKey: 'privateTitle' as const,
      agesKey: 'privateAges' as const,
      descKey: 'privateDesc' as const,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">{t('headline')}</h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Program cards */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {programs.map(({ id, Icon, titleKey, agesKey, descKey }) => (
              <div
                key={id}
                className="bg-[var(--color-sage)] rounded-2xl p-8 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-forest)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-[var(--color-forest)]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--color-black)] leading-tight">
                      {t(titleKey)}
                    </h2>
                    <p className="text-xs text-[var(--color-forest)] font-semibold uppercase tracking-wider mt-0.5">
                      {t(agesKey)}
                    </p>
                  </div>
                </div>
                <p className="text-[var(--color-body)] text-sm leading-relaxed flex-1">
                  {t(descKey)}
                </p>
                <div className="mt-6">
                  <span className="inline-block bg-[var(--color-lime)] text-white text-xs font-bold py-1.5 px-4 rounded-full uppercase tracking-wider">
                    {t('comingSoon')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify CTA */}
      <section className="bg-[var(--color-black)] text-white py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-4">{t('notifyTitle')}</h2>
          <p className="text-white/70 mb-8 leading-relaxed">{t('notifyDesc')}</p>
          <a
            href="https://instagram.com/akdovey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
          >
            {t('notifyCta')}
          </a>
        </div>
      </section>
    </>
  );
}
