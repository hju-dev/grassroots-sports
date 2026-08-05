import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">{t('headline')}</h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[var(--color-sage)] rounded-2xl p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-3">
                {t('locationTitle')}
              </p>
              <p className="font-bold text-[var(--color-black)] mb-1">{t('locationDesc')}</p>
              <p className="text-sm text-[var(--color-muted)]">{t('locationSub')}</p>
            </div>

            <div className="bg-[var(--color-sage)] rounded-2xl p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-3">
                {t('instagramTitle')}
              </p>
              <p className="text-sm text-[var(--color-muted)] mb-3">{t('instagramDesc')}</p>
              <a
                href="https://instagram.com/akdovey"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--color-forest)] hover:text-[var(--color-lime)] transition-colors"
              >
                @akdovey
              </a>
            </div>
          </div>

          {/* Form */}
          <ContactForm />

        </div>
      </section>
    </>
  );
}
