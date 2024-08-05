'use client';

import { usePathname, useRouter } from 'next/navigation';

import styled, { css } from 'styled-components';

import { URL_PATH } from '@/constants/url-path';
import theme from '@/styles/theme';

import Icon from '../Icon';

interface MenuOptions {
  label: string;
  value: string;
  icon: 'Home' | 'Write' | 'Profile';
}

export default function BottomNavigation() {
  const route = useRouter();
  const pathname = usePathname();

  const MENU_OPTIONS: MenuOptions[] = [
    { label: '홈', value: URL_PATH.HOME, icon: 'Home' },
    { label: '기록하기', value: `/${URL_PATH.RECORD.HOME}`, icon: 'Write' },
    { label: '마이', value: `/${URL_PATH.MY.HOME}`, icon: 'Profile' },
  ];

  return (
    <NavBar>
      {MENU_OPTIONS.map(menu => (
        <MENU
          key={menu.value}
          onClick={() => route.push(menu.value)}
          current={pathname === menu.value}
        >
          <Icon
            icon={menu.icon}
            color={pathname === menu.value ? theme.colors.greyScale.coolGray_6 : ''}
            cursor="pointer"
          />
          {menu.label}
        </MENU>
      ))}
    </NavBar>
  );
}

const NavBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: space-around;
  padding: 1rem 1.8rem;

  background-color: ${({ theme }) => theme.colors.greyScale.grayScale_0};
  box-shadow: 0px -1px 8px 0px rgba(0, 0, 0, 0.1);
`;

const MENU = styled.div<{ current: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;

  color: ${({ theme }) => theme.colors.greyScale.coolGray_2};

  cursor: pointer;

  ${({ current, theme }) =>
    current &&
    css`
      color: ${theme.colors.greyScale.coolGray_6};
    `}
`;
