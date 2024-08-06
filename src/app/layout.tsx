import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';

import BottomNavigation from '@/components/BottomNavigation';
import Header from '@/components/Header';
import Providers from '@/providers';

type UserAgent = 'desktop' | 'mobile';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'journey.log',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const deviceTypeHeader = headers().get('device-type') || '';
  const userAgent: UserAgent = deviceTypeHeader === 'mobile' ? 'mobile' : 'desktop';

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <Providers>
          {userAgent === 'desktop' && <Header />}
          <main
            style={{
              marginTop: userAgent === 'desktop' ? '4.8rem' : '',
              marginBottom: userAgent === 'mobile' ? '7.6rem' : '',
            }}
          >
            {children}
          </main>
          {userAgent === 'mobile' && <BottomNavigation />}
        </Providers>
      </body>
    </html>
  );
}
