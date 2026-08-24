import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Gallery | Grass Roots Sports' : 'แกลเลอรี่ | Grass Roots Sports',
    description: isEn
      ? 'Photos from Grass Roots Sports coaching sessions, leagues, tournaments, and community events in Pattaya.'
      : 'ภาพถ่ายจากเซสชันการโค้ช ลีก ทัวร์นาเมนต์ และอีเวนต์ชุมชน Grass Roots Sports ในพัทยา',
    alternates: buildAlternates(locale, '/gallery'),
  };
}

const photos = [
  { src: '/images/team-huddle.webp',     alt: 'Grassroots Sports team huddle',           caption: 'Team huddle' },
  { src: '/images/game-action.webp',     alt: 'Grassroots Sports game action',            caption: 'Game action' },
  { src: '/images/coach-huddle.webp',    alt: 'Coach and players in huddle',             caption: 'Coaching session' },
  { src: '/images/team-timeout.webp',    alt: 'Team timeout during a game',              caption: 'Game time' },
  { src: '/images/youth-scrimmage.webp', alt: 'Youth scrimmage session',                 caption: 'Youth scrimmage' },
  { src: '/images/team-champions.webp',  alt: 'Girls team celebrating championship win', caption: 'Champions' },
  { src: '/images/community-group.webp', alt: 'Grassroots Sports community group photo', caption: 'Community' },
  { src: '/images/team-dinner.webp',     alt: 'Team community dinner',                   caption: 'Team dinner' },
];

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations('gallery');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <CourtLines className="text-white/10" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">{t('headline')}</h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {photos.map((photo, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl group break-inside-avoid">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-[var(--color-black)] text-white py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-4">{t('igLabel')}</h2>
          <p className="text-white/70 mb-8 leading-relaxed">{t('igDesc')}</p>
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
