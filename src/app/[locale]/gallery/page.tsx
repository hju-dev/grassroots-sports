import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { BasketballIcon, LightningIcon, TrophyIcon, TargetIcon, CommunityIcon } from '@/components/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Gallery | Grass Roots Sports' : 'แกลเลอรี่ | Grass Roots Sports',
    description: isEn
      ? 'Photos from Grass Roots Sports coaching sessions, leagues, tournaments, and community events in Pattaya.'
      : 'ภาพถ่ายจากเซสชันการโค้ช ลีก ทัวร์นาเมนต์ และอีเวนต์ชุมชน Grass Roots Sports ในพัทยา',
  };
}

type GalleryItem = {
  id: number;
  label: string;
  labelTh: string;
  program: 'youth' | 'teen' | 'adult' | 'private' | 'event';
  featured?: boolean;
  src?: string; // drop files in public/gallery/ and set path here
};

// When Alex has real photos: set src: '/gallery/filename.jpg' on each item
const galleryItems: GalleryItem[] = [
  { id: 1,  program: 'youth',   label: 'Youth Training Session',      labelTh: 'เซสชันฝึกซ้อมเยาวชน',     featured: true  },
  { id: 2,  program: 'adult',   label: 'Adult League Night',           labelTh: 'คืนลีกผู้ใหญ่',            featured: true  },
  { id: 3,  program: 'teen',    label: 'Teen Academy Drills',          labelTh: 'การฝึก Teen Academy'                        },
  { id: 4,  program: 'youth',   label: 'Skills Clinic',                labelTh: 'คลินิกทักษะ'                                },
  { id: 5,  program: 'event',   label: 'Community Tournament',         labelTh: 'ทัวร์นาเมนต์ชุมชน'                         },
  { id: 6,  program: 'private', label: 'Private Coaching Session',     labelTh: 'เซสชันการโค้ชส่วนตัว'                      },
  { id: 7,  program: 'teen',    label: 'Scrimmage Game',               labelTh: 'เกมฝึกซ้อม'                                 },
  { id: 8,  program: 'adult',   label: 'Open Gym',                     labelTh: 'Open Gym'                                   },
  { id: 9,  program: 'event',   label: 'Holiday Camp',                 labelTh: 'แคมป์วันหยุด',              featured: true  },
  { id: 10, program: 'youth',   label: 'Fundamentals Workshop',        labelTh: 'เวิร์คช็อปพื้นฐาน'                         },
  { id: 11, program: 'teen',    label: 'Competitive Training',         labelTh: 'การฝึกซ้อมแข่งขัน'                         },
  { id: 12, program: 'event',   label: 'Community Day',                labelTh: 'วันชุมชน'                                   },
];

const programColors: Record<GalleryItem['program'], string> = {
  youth:   'from-[var(--color-forest)] to-[var(--color-lime)]',
  teen:    'from-[var(--color-black)] to-[var(--color-forest)]',
  adult:   'from-[var(--color-forest)] to-[#1a3a2a]',
  private: 'from-[#1a3a2a] to-[var(--color-forest)]',
  event:   'from-[var(--color-lime)] to-[var(--color-forest)]',
};

const ProgramIcon: Record<GalleryItem['program'], React.FC<{ className?: string }>> = {
  youth:   BasketballIcon,
  teen:    LightningIcon,
  adult:   TrophyIcon,
  private: TargetIcon,
  event:   CommunityIcon,
};

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('gallery');
  const isEn = locale === 'en';

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">{t('headline')}</h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryItems.map((item) => {
              const Icon = ProgramIcon[item.program];
              const label = isEn ? item.label : item.labelTh;

              return (
                <div
                  key={item.id}
                  className={`relative overflow-hidden rounded-2xl group ${item.featured ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}`}
                  style={{ aspectRatio: item.featured ? '1/1.4' : '1/1' }}
                >
                  {item.src ? (
                    // Real photo — swap placeholder div for this when photos are ready:
                    // <Image src={item.src} alt={label} fill className="object-cover" />
                    <div className={`w-full h-full bg-gradient-to-br ${programColors[item.program]}`} />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${programColors[item.program]} flex flex-col items-center justify-center`}>
                      <Icon className="w-12 h-12 md:w-16 md:h-16 text-white/40" />
                    </div>
                  )}
                  {/* Label overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{label}</p>
                  </div>
                  {/* Always-visible label on mobile */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2 md:hidden">
                    <p className="text-white text-xs font-semibold truncate">{label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-[var(--color-black)] text-white py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-4">{t('placeholderLabel')}</h2>
          <p className="text-white/70 mb-8 leading-relaxed">{t('placeholderDesc')}</p>
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
