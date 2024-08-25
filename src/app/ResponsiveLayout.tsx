'use client';

import { useEffect, useState } from 'react';

import BottomNavigation from '@/components/BottomNavigation';
import { MobileHeader, PCHeader } from '@/components/Header';
import { useViewport } from '@/hooks';

import { UserAgent } from './layout';

export default function ResponsiveLayout({
  initialUserAgent,
  children,
}: {
  initialUserAgent: UserAgent;
  children: React.ReactNode;
}) {
  const [userAgent, setUserAgent] = useState<UserAgent>(initialUserAgent);
  const { isMobile } = useViewport();

  useEffect(() => {
    setUserAgent(isMobile ? 'mobile' : 'desktop');
  }, [isMobile]);

  return (
    <>
      {userAgent === 'desktop' ? <PCHeader /> : <MobileHeader />}
      <main
        style={{
          marginTop: '4.8rem',
          marginBottom: userAgent === 'mobile' ? '7.6rem' : '',
        }}
      >
        {children}
      </main>
      {userAgent === 'mobile' && <BottomNavigation />}
    </>
  );
}
