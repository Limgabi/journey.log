import { colors } from './colors';
import { displayWidth, borderRadius } from './common';

const theme: {
  colors: typeof colors;
  displayWidth: typeof displayWidth;
  borderRadius: typeof borderRadius;
} = {
  colors,
  displayWidth,
  borderRadius,
} as const;

export type ThemeType = typeof theme;

export default theme;
