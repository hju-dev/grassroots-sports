import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { sanityClient } from '@/sanity/lib/client';

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
  const [messages, settings] = await Promise.all([
    getMessages(),
    sanityClient.fetch<{ announcementBannerEn?: string; announcementBannerTh?: string } | null>(
      `*[_type == "settings"][0]{ announcementBannerEn, announcementBannerTh }`,
      {},
      { next: { revalidate: 60 } }
    ),
  ]);

  const banner = locale === 'th' ? (settings?.announcementBannerTh || settings?.announcementBannerEn) : settings?.announcementBannerEn;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {banner && (
        <div className="bg-[var(--color-forest)] text-white text-center text-sm font-medium py-2 px-4">
          {banner}
        </div>
      )}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
