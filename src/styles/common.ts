import { css } from 'styled-components';

export const borderRadius = {
  xs: '0.4rem',
  sm: '0.8rem',
  md: '1.2rem',
  lg: '1.6rem',
} as const;

export const truncateText = (numberOfLine: number) => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${numberOfLine};

  overflow: hidden;
  text-overflow: ellipsis;
`;

export const USER_SELECT_NONE = css`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -html-user-select: none;
  user-select: none;
`;

export const displayWidth = {
  mobile: '36rem',
  pad: '76.8rem',
  desktop: '128rem',
} as const;
