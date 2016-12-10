/* @flow */
import type { Theme } from './types';
import openColor from './openColor';

// All constants belong to the theme.

const theme: Theme = {
  text: {
    // www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: 1.5,
    bold: 600,
  },
  fontSizes: {
    extraSmall: 12,
    small: 14,
    medium: 16,
    big: 22,
    extraBig: 32,
  },
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
    gray: openColor.gray4,
    open: openColor,
  },
  border: {
    radius: 2,
    width: 1,
  },
  states: {
    disabled: {
      cursor: 'default',
      opacity: 0.5,
    },
  },
  heading: {
    lineHeight: 1.25,
  },
};

export default theme;
