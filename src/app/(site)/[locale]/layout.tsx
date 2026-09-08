import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HtmlLangSync from '@/components/HtmlLangSync';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { getPayloadClient } from '@/lib/payload';

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
  const [messages, payload] = await Promise.all([getMessages(), getPayloadClient()]);
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
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer locale={locale} />
      <StickyMobileCTA />
    </NextIntlClientProvider>
  );
}
