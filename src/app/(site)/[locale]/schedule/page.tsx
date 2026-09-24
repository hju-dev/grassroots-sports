import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { buildAlternates } from '@/lib/seo';
import { getLinks, instagramHandle } from '@/lib/content';
import { getSchedule } from '@/lib/settings';
import { SCHEDULE_DAYS, type ScheduleProgram } from '@/lib/schedule-defs';
import CourtLines from '@/components/CourtLines';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Schedule | Grass Roots Sports' : 'ตารางเวลา | Grass Roots Sports',
    description: isEn
      ? 'Program schedule for Grass Roots Sports in Pattaya. Youth, teen, adult leagues, and private coaching, launching soon.'
      : 'ตารางเวลาโปรแกรม Grass Roots Sports ในพัทยา บาสเกตบอลเยาวชน วัยรุ่น ลีกผู้ใหญ่ และการโค้ชส่วนตัว เปิดตัวเร็วๆ นี้',
    alternates: buildAlternates(locale, '/schedule'),
  };
}

export default async function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('schedule');
  const tPrograms = await getTranslations('programs');
  const tNav = await getTranslations('nav');
  const links = await getLinks();

  const { week } = await getSchedule();

  const programLabel: Record<ScheduleProgram, string> = {
    youth: tPrograms('youthTitle'),
    teen: tPrograms('teenTitle'),
    adult: tPrograms('adultTitle'),
    private: tPrograms('privateTitle'),
    clinic: t('skillsClinic'),
  };
  const programColor: Record<ScheduleProgram, string> = {
    youth: 'bg-[var(--color-forest)]/10 text-[var(--color-forest)]',
    teen: 'bg-[var(--color-lime)]/10 text-[var(--color-black)]',
    adult: 'bg-[var(--color-black)]/5 text-[var(--color-body)]',
    private: 'bg-[var(--color-black)]/5 text-[var(--color-body)]',
    clinic: 'bg-[var(--color-lime)]/10 text-[var(--color-black)]',
  };

  return (
    <>
      <Breadcrumbs items={[{ label: tNav('home'), href: `/${locale}` }, { label: tNav('schedule') }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block bg-[var(--color-lime)] text-[var(--color-black)] text-xs font-bold py-1.5 px-4 rounded-full uppercase tracking-widest mb-5">
            {t('comingSoonBadge')}
          </span>
          <h1 className="text-5xl md:text-7xl mb-4">{t('headline')}</h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Weekly schedule */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl text-[var(--color-black)] mb-3">{t('weeklyTitle')}</h2>
            <p className="text-[var(--color-muted)] text-sm md:text-base max-w-2xl">{t('weeklyDesc')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCHEDULE_DAYS.map((dayKey) => {
              const slots = week[dayKey];
              return (
                <div key={dayKey} className="bg-[var(--color-sage)] rounded-2xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-4">
                    {t(dayKey)}
                  </p>

                  {slots.length === 0 ? (
                    <p className="text-sm text-[var(--color-muted)] italic">{t('closed')}</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {slots.map((slot, i) => (
                        <div key={i} className={`rounded-lg px-3 py-2.5 ${programColor[slot.program]}`}>
                          <p className="text-xs font-bold">{programLabel[slot.program]}</p>
                          <p className="text-xs opacity-70 mt-0.5">
                            {slot.time || (slot.program === 'private' ? t('byAppt') : t('tbc'))}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Camps & Clinics */}
      <section className="bg-[var(--color-sage)] py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-black)] mb-4">{t('specialTitle')}</h2>
            <p className="text-[var(--color-body)] leading-relaxed">{t('specialDesc')}</p>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-sm font-bold text-[var(--color-forest)] hover:text-[var(--color-lime)] transition-colors uppercase tracking-widest"
            >
              @{instagramHandle(links.instagram)}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(['campHoliday', 'campClinics', 'campTournaments', 'campOpenGym'] as const).map((key) => (
              <div key={key} className="bg-white rounded-xl p-5 text-center">
                <span className="inline-block bg-[var(--color-lime)] text-[var(--color-black)] text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wider mb-2">
                  {t('comingSoonBadge')}
                </span>
                <p className="text-sm font-bold text-[var(--color-black)] mt-1">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section className="bg-[var(--color-black)] text-white py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-4">{t('notifyTitle')}</h2>
          <p className="text-white/70 mb-8 leading-relaxed">{t('notifyDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/register`}
              className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white hover:text-[var(--color-black)] font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {t('notifyRegister')}
            </Link>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/30 hover:border-white text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {t('notifyInstagram')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
