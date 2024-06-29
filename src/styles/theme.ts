import { displayWidth, borderRadius } from './common';

const theme: {
  displayWidth: typeof displayWidth;
  borderRadius: typeof borderRadius;
} = {
  displayWidth,
  borderRadius,
} as const;

export type ThemeType = typeof theme;

export default theme;
