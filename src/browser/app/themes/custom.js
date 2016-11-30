/* @flow */
import type { Theme } from './initial';
import initial from './initial';

const theme: Theme = {
  ...initial,
  fontSizes: {
    h1: 30,
    h2: 22,
    h3: 18,
    text: 14,
    smallText: 12,
  },
  lineHeight: 2,
  colors: {
    ...initial.colors,
    primary: '#6496c8',
    black: '#555',
  },
};

export default theme;
