import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

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
  icons: { icon: '/logo.jpg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
        <body className="min-h-screen flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
