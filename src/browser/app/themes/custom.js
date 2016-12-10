/* @flow */
import type { Theme } from './types';
import openColor from './openColor';

const theme: Theme = {
  text: {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: 2,
    bold: 600,
  },
  fontSizes: {
    extraSmall: 10,
    small: 12,
    medium: 13,
    big: 20,
    extraBig: 28,
  },
  sizes: {
    extraSmall: 4,
    small: 8,
    medium: 16,
    big: 32,
    extraBig: 64,
  },
  colors: {
    primary: '#6496c8',
    secondary: '#888',
    info: '#08e',
    success: '#1c7',
    warning: '#f70',
    error: '#f52',
    black: '#555',
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
