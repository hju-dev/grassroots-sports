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

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; program: string }>;
}) {
  const { locale, program } = await params;

  if (!validPrograms.includes(program as Program)) {
    notFound();
  }

  const p = program as Program;
  const t = await getTranslations('programDetail');
  const icons = programIcons[p];

  // Helper for dynamic program-namespaced keys
  const d = (key: string): string =>
    (t as unknown as (k: string) => string)(`${p}.${key}`);

  const hasPathway = d('pathwayLabel') !== '';

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
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
            {d('ages')}
          </span>
          <h1 className="text-5xl md:text-8xl mb-4">{d('hero')}</h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-2xl leading-relaxed">{d('tagline')}</p>
          <div className="mt-10">
            <Link
              href={`/${locale}/register?program=${p}`}
              className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] border border-white/20 text-white font-bold py-4 px-10 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {d('cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Overview + Philosophy */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <p className="text-[var(--color-body)] text-lg leading-relaxed">{d('overview')}</p>
          </div>
          <div className="bg-[var(--color-sage)] rounded-2xl p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-3">
              {d('philosophyLabel')}
            </p>
            <p className="text-[var(--color-body)] leading-relaxed italic">
              &ldquo;{d('philosophy')}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* What you'll learn — 4 cards */}
      <section className="bg-[var(--color-sage)] py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-[var(--color-black)] mb-10 md:mb-12">
            {d('learnTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {([1, 2, 3, 4] as const).map((n, i) => {
              const Icon = icons[i];
              return (
                <div key={n} className="bg-white rounded-2xl p-7">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-forest)]/10 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[var(--color-forest)]" />
                  </div>
                  <h3 className="font-bold text-[var(--color-black)] text-lg mb-2">
                    {d(`learn${n}Title`)}
                  </h3>
                  <p className="text-[var(--color-body)] text-sm leading-relaxed">
                    {d(`learn${n}Desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Format + Who It's For */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-black)] mb-4">
              {d('formatTitle')}
            </h2>
            <p className="text-[var(--color-body)] leading-relaxed">{d('formatDesc')}</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-black)] mb-4">
              {d('forTitle')}
            </h2>
            <p className="text-[var(--color-body)] leading-relaxed">{d('forDesc')}</p>
          </div>
        </div>
      </section>

      {/* Pathway banner (youth + teen only) */}
      {hasPathway && (
        <section className="bg-[var(--color-forest)] text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-lime)] mb-3">
              {d('pathwayLabel')}
            </p>
            <p className="text-white/90 leading-relaxed max-w-3xl">{d('pathway')}</p>
          </div>
        </section>
      )}

      {/* Register CTA */}
      <section className="bg-[var(--color-black)] text-white py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-4">{d('ctaTitle')}</h2>
          <p className="text-white/70 mb-8 leading-relaxed">{d('ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/register?program=${p}`}
              className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {d('cta')}
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
