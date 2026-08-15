import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { BasketballIcon, LightningIcon, TrophyIcon, TargetIcon, CommunityIcon } from '@/components/Icons';
import { sanityClient } from '@/sanity/lib/client';
import { GALLERY_QUERY } from '@/sanity/lib/queries';

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

type SanityPhoto = {
  imageUrl: string;
  lqip: string;
  captionEn: string | null;
  captionTh: string | null;
  category: 'youth' | 'teen' | 'adult' | 'events' | null;
};

type StaticPhoto = { src: string; alt: string; caption: string };

const staticPhotos: StaticPhoto[] = [
  { src: '/images/team-huddle.png',     alt: 'Grassroots Sports team huddle',           caption: 'Team huddle' },
  { src: '/images/game-action.png',     alt: 'Game action — Grassroots Sports',          caption: 'Game action' },
  { src: '/images/coach-huddle.png',    alt: 'Coach and players in huddle',             caption: 'Coaching session' },
  { src: '/images/team-timeout.png',    alt: 'Team timeout during a game',              caption: 'Game time' },
  { src: '/images/youth-scrimmage.png', alt: 'Youth scrimmage session',                 caption: 'Youth scrimmage' },
  { src: '/images/team-champions.png',  alt: 'Girls team celebrating championship win', caption: 'Champions' },
  { src: '/images/community-group.png', alt: 'Grassroots Sports community group photo', caption: 'Community' },
  { src: '/images/team-dinner.jpg',     alt: 'Team community dinner',                   caption: 'Team dinner' },
];

const CategoryIcon: Record<string, React.FC<{ className?: string }>> = {
  youth:   BasketballIcon,
  teen:    LightningIcon,
  adult:   TrophyIcon,
  private: TargetIcon,
  events:  CommunityIcon,
};

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, photos] = await Promise.all([
    getTranslations('gallery'),
    sanityClient.fetch(GALLERY_QUERY).catch(() => [] as SanityPhoto[]),
  ]);

  const isEn = locale === 'en';
  const hasPhotos = photos && photos.length > 0;

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
          {hasPhotos ? (
            <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
              {(photos as SanityPhoto[]).map((photo, i) => {
                const caption = isEn ? photo.captionEn : photo.captionTh;
                const cat = photo.category || 'events';
                const Icon = CategoryIcon[cat] || CommunityIcon;
                return (
                  <div key={i} className="relative overflow-hidden rounded-2xl group break-inside-avoid">
                    <Image
                      src={photo.imageUrl}
                      alt={caption || ''}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      placeholder={photo.lqip ? 'blur' : undefined}
                      blurDataURL={photo.lqip || undefined}
                    />
                    {caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                        <p className="text-white text-sm font-semibold">{caption}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
              {staticPhotos.map((photo, i) => (
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
          )}
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
