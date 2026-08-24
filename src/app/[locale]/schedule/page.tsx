import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';
import HeroSheen from '@/components/HeroSheen';

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

type DaySchedule = {
  dayKey: string;
  slots: { program: string; programKey: string; color: string }[];
  closed?: boolean;
};

export default async function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('schedule');
  const tPrograms = await getTranslations('programs');

  const week: DaySchedule[] = [
    {
      dayKey: 'mon',
      slots: [
        { program: tPrograms('youthTitle'), programKey: 'youth', color: 'bg-[var(--color-forest)]/10 text-[var(--color-forest)]' },
        { program: tPrograms('teenTitle'),  programKey: 'teen',  color: 'bg-[var(--color-lime)]/10   text-[var(--color-lime)]'   },
      ],
    },
    {
      dayKey: 'tue',
      slots: [
        { program: tPrograms('privateTitle'), programKey: 'private', color: 'bg-[var(--color-black)]/5 text-[var(--color-body)]' },
      ],
    },
    {
      dayKey: 'wed',
      slots: [
        { program: tPrograms('youthTitle'), programKey: 'youth', color: 'bg-[var(--color-forest)]/10 text-[var(--color-forest)]' },
        { program: tPrograms('teenTitle'),  programKey: 'teen',  color: 'bg-[var(--color-lime)]/10   text-[var(--color-lime)]'   },
        { program: tPrograms('adultTitle'), programKey: 'adult', color: 'bg-[var(--color-black)]/5   text-[var(--color-body)]'   },
      ],
    },
    {
      dayKey: 'thu',
      slots: [
        { program: tPrograms('privateTitle'), programKey: 'private', color: 'bg-[var(--color-black)]/5 text-[var(--color-body)]' },
      ],
    },
    {
      dayKey: 'fri',
      slots: [
        { program: tPrograms('teenTitle'),  programKey: 'teen',  color: 'bg-[var(--color-lime)]/10 text-[var(--color-lime)]'     },
        { program: tPrograms('adultTitle'), programKey: 'adult', color: 'bg-[var(--color-black)]/5 text-[var(--color-body)]'     },
      ],
    },
    {
      dayKey: 'sat',
      slots: [
        { program: tPrograms('youthTitle'), programKey: 'youth', color: 'bg-[var(--color-forest)]/10 text-[var(--color-forest)]' },
        { program: 'Skills Clinic',         programKey: 'event', color: 'bg-[var(--color-lime)]/10   text-[var(--color-lime)]'   },
        { program: tPrograms('privateTitle'), programKey: 'private', color: 'bg-[var(--color-black)]/5 text-[var(--color-body)]' },
      ],
    },
    {
      dayKey: 'sun',
      closed: true,
      slots: [],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <HeroSheen />
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block bg-[var(--color-lime)] text-white text-xs font-bold py-1.5 px-4 rounded-full uppercase tracking-widest mb-5">
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
            {week.map((day) => (
              <div key={day.dayKey} className="bg-[var(--color-sage)] rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-4">
                  {t(day.dayKey as Parameters<typeof t>[0])}
                </p>

                {day.closed ? (
                  <p className="text-sm text-[var(--color-muted)] italic">{t('closed')}</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {day.slots.map((slot) => (
                      <div key={slot.programKey + slot.program} className={`rounded-lg px-3 py-2.5 ${slot.color}`}>
                        <p className="text-xs font-bold">{slot.program}</p>
                        <p className="text-xs opacity-70 mt-0.5">
                          {slot.programKey === 'private' ? t('byAppt') : t('tbc')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
              href="https://instagram.com/akdovey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-sm font-bold text-[var(--color-forest)] hover:text-[var(--color-lime)] transition-colors uppercase tracking-widest"
            >
              @akdovey
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(['Holiday Camps', 'Skills Clinics', 'Tournaments', 'Open Gym'] as const).map((label) => (
              <div key={label} className="bg-white rounded-xl p-5 text-center">
                <span className="inline-block bg-[var(--color-lime)] text-white text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wider mb-2">
                  {t('comingSoonBadge')}
                </span>
                <p className="text-sm font-bold text-[var(--color-black)] mt-1">{label}</p>
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
              className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              {t('notifyRegister')}
            </Link>
            <a
              href="https://instagram.com/akdovey"
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
