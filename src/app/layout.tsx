import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';

import Providers from '@/providers';

import ResponsiveLayout from './ResponsiveLayout';

export type UserAgent = 'desktop' | 'mobile';

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
  console.log('초기 userAgent', userAgent);
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ResponsiveLayout initialUserAgent={userAgent}>{children}</ResponsiveLayout>
        </Providers>
      </body>
    </html>
  );
}
