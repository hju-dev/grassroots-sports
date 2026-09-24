import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getPayloadClient } from '@/lib/payload';
import { getPublishedGallery } from '@/lib/gallery';
import { getLinks } from '@/lib/content';

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

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const payload = await getPayloadClient();
  const [t, tNav, managed] = await Promise.all([
    getTranslations('gallery'),
    getTranslations('nav'),
    getPublishedGallery(locale === 'th' ? 'th' : 'en'),
  ]);

  // The dashboard's gallery is the source of truth. Only if its table can't be
  // read (null) do we fall back to the CMS media library, so the page never breaks.
  let photos = managed;
  if (photos === null) {
    const media = await payload
      .find({
        collection: 'media',
        locale: locale as 'en' | 'th',
        sort: '-createdAt',
        limit: 50,
        // Uncategorized uploads (test/admin uploads, seed leftovers) never
        // show up on the public gallery, only ones deliberately tagged for it.
        where: { category: { exists: true } },
      })
      .catch(() => null);
    photos = (media?.docs ?? []).map((doc) => ({
      src: doc.url || '',
      width: doc.width || 600,
      height: doc.height || 400,
      alt: doc.alt,
      caption: doc.caption || '',
      category: doc.category || 'events',
    }));
  }
  const instagramUrl = (await getLinks()).instagram;

  return (
    <>
      <Breadcrumbs items={[{ label: tNav('home'), href: `/${locale}` }, { label: tNav('gallery') }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">{t('headline')}</h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="gallery-filter-section py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <fieldset className="mb-8 md:mb-10 flex flex-wrap justify-center gap-2 border-0 p-0 m-0">
            <legend className="sr-only">{t('filterLabel')}</legend>
            {(['all', 'youth', 'teen', 'adult', 'events'] as const).map((key) => (
              <div key={key}>
                <input
                  type="radio"
                  name="gallery-filter"
                  id={`filter-${key}`}
                  defaultChecked={key === 'all'}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`filter-${key}`}
                  className="inline-flex min-h-11 items-center cursor-pointer rounded-full border border-[var(--color-black)]/10 bg-white px-5 text-xs font-bold uppercase tracking-wider text-[var(--color-body)] transition-colors hover:border-[var(--color-forest)] peer-checked:border-[var(--color-forest)] peer-checked:bg-[var(--color-forest)] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-forest)] peer-focus-visible:ring-offset-2"
                >
                  {t(key === 'all' ? 'filterAll' : (`filter${key.charAt(0).toUpperCase()}${key.slice(1)}` as Parameters<typeof t>[0]))}
                </label>
              </div>
            ))}
          </fieldset>
          <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                data-category={photo.category}
                className="gallery-photo relative overflow-hidden rounded-2xl group break-inside-avoid"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 768px) 50vw, 33vw"
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
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white hover:text-[var(--color-black)] font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
          >
            {t('instagramCta')}
          </a>
        </div>
      </section>
    </>
  );
}
