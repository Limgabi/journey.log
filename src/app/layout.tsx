import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import BottomNavigation from '@/components/BottomNavigation';
import Header from '@/components/Header';
import Providers from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'journey.log',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <BottomNavigation />
        </Providers>
      </body>
    </html>
  );
}
