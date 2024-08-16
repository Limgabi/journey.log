'use client';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import { URL_PATH } from '@/constants/url-path';

import Icon from '../Icon';
import Popover from '../Popover';

interface MenuOptions {
  label: string;
  value: string;
  icon: 'Write' | 'Profile';
}

export default function Header() {
  const router = useRouter();

  return (
    <HeaderWrapper>
      <Logo onClick={() => router.push(`${URL_PATH.HOME}`)}>j.log</Logo>
      <Popover content={<MenuContent />} placement="bottomRight">
        <Icon icon="Profile" cursor="pointer" />
      </Popover>
    </HeaderWrapper>
  );
}

const MenuContent = () => {
  const route = useRouter();

  const MENU_OPTIONS: MenuOptions[] = [
    { label: '기록하기', value: `/${URL_PATH.RECORD.HOME}`, icon: 'Write' },
    { label: '마이', value: `/${URL_PATH.MY.HOME}`, icon: 'Profile' },
  ];

  return (
    <MenuWrapper>
      {MENU_OPTIONS.map(option => (
        <Menu
          key={option.value}
          onClick={() => {
            route.push(option.value);
          }}
        >
          <Icon icon={option.icon} cursor="pointer" />
          {option.label}
        </Menu>
      ))}
    </MenuWrapper>
  );
};

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

  background-color: ${({ theme }) => theme.colors.greyScale.grayScale_0};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.button`
  border: none;
  outline: none;
  background-color: inherit;

  font-size: 2.4rem;
  font-weight: 700;
`;

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  width: 10rem;
  list-style: none;

  overflow-y: auto;
`;

const Menu = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  padding: 0.4rem;

  color: ${({ theme }) => theme.colors.greyScale.warmGray_6};
  font-size: 1.4rem;

  cursor: pointer;

  &:hover {
    background-color: #0000000f;
  }
`;
