/* @flow */
import type { Theme } from './types';
import openColor from './openColor';

const theme: Theme = {
  // www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  fontSizes: {
    extraSmall: 12,
    small: 14,
    medium: 16,
    big: 20,
    extraBig: 24,
  },
  lineHeight: 1.5,
  bold: 600,
  sizes: {
    extraSmall: 4,
    small: 8,
    medium: 16,
    big: 32,
    extraBig: 64,
  },
  colors: {
    primary: '#08e',
    secondary: '#888',
    info: '#08e',
    success: '#1c7',
    warning: '#f70',
    error: '#f52',
    black: openColor.gray8,
    white: '#fff',
    open: openColor,
  },
  border: {
    radius: 2,
    color: 'rgba(0, 0, 0, .25)',
  },
  states: {
    disabled: {
      cursor: 'default',
      opacity: 0.5,
    },
  },
};

export default theme;
