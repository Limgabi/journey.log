'use client';

import { usePathname, useRouter } from 'next/navigation';

import styled from 'styled-components';

import { URL_PATH } from '@/constants/url-path';

import Icon from '../Icon';

export function MobileHeader() {
  const route = useRouter();
  const pathname = usePathname();

  const handleClickBack = () => {
    route.back();
  };

  return (
    <HeaderWrapper>
      {pathname === URL_PATH.HOME ? (
        <Logo>j.log</Logo>
      ) : (
        <Icon icon="Chevron" cursor="pointer" onClick={() => handleClickBack()} />
      )}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: flex-start;

  padding: 1.2rem 2rem;
`;

const Logo = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
`;
