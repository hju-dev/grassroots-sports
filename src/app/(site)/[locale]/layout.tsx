import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HtmlLangSync from '@/components/HtmlLangSync';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { getPayloadClient } from '@/lib/payload';
import { getSlotImages } from '@/lib/image-slots';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, payload, slots] = await Promise.all([
    getMessages(),
    getPayloadClient(),
    getSlotImages(locale as 'en' | 'th'),
  ]);
  const settings = await payload
    .findGlobal({ slug: 'settings', locale: locale as 'en' | 'th' })
    .catch(() => null);

  const banner = settings?.announcementBanner;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <HtmlLangSync locale={locale} />
      {banner && (
        <div className="bg-[var(--color-forest)] text-white text-center text-sm font-medium py-2 px-4">
          {banner}
        </div>
      )}
      <Navbar logo={{ src: slots.site_logo.src, alt: slots.site_logo.alt }} />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <Footer locale={locale} />
      <StickyMobileCTA />
    </NextIntlClientProvider>
  );
}
