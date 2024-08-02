'use client';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import { URL_PATH } from '@/constants/url-path';

import Icon from '../Icon';

export default function Header() {
  const router = useRouter();
  return (
    <HeaderWrapper>
      <Logo onClick={() => router.push(`${URL_PATH.HOME}`)}>j.log</Logo>
      <Icon icon="Profile" cursor="pointer" onClick={() => router.push(`/${URL_PATH.MY.HOME}`)} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.8rem;
  padding: 0 4rem;

  background-color: white;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.button`
  border: none;
  outline: none;
  background-color: inherit;

  font-size: 2.4rem;
  font-weight: 700;
`;
