import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://grassrootssports.org'),
  title: 'Grass Roots Sports',
  description: 'Community basketball academy coming to Pattaya, Thailand.',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'Grass Roots Sports',
  url: 'https://grassrootssports.org',
  logo: 'https://grassrootssports.org/logo.png',
  description: 'Community basketball coaching, leagues, and development programs for all ages in Pattaya, Thailand.',
  sport: 'Basketball',
  areaServed: {
    '@type': 'City',
    name: 'Pattaya, Thailand',
  },
  sameAs: ['https://instagram.com/akdovey'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The `[locale]` segment lives below this layout, so Next.js never resolves it
  // into this layout's params — `<html lang>` gets synced client-side instead,
  // by HtmlLangSync in the locale layout.
  //
  // No <ClerkProvider> here deliberately — Clerk is only needed for the /ops
  // dashboard and /sign-in, so it's scoped to those subtrees instead
  // (ops/layout.tsx, sign-in/page.tsx). Wrapping the whole site in it made
  // Clerk set session-tracking cookies on every public visitor, which never
  // needed them and contradicted the privacy policy's "no tracking cookies"
  // claim.
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
