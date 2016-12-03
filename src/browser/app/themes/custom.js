/* @flow */
import type { Theme } from './types';
import initial from './initial';

const theme: Theme = {
  ...initial,
  fontSizes: {
    extraSmall: 10,
    small: 12,
    medium: 13,
    big: 18,
    extraBig: 22,
  },
  lineHeight: 2,
  colors: {
    ...initial.colors,
    primary: '#6496c8',
    black: '#555',
  },
};

export default theme;
