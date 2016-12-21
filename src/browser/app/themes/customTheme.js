/* @flow */
import type { Theme } from './types';
import openColor from './openColor';
import typography from './typography';

const theme: Theme = {
  typography: typography({
    fontSize: 18,
    fontSizeScale: 'step5',
    lineHeight: 27, // 18 * 1.5
  }),
  colors: {
    primary: '#08e',
    success: '#1c7',
    warning: '#f70',
    danger: '#f52',
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
  container: {
    maxWidths: {
      small: 540,
      medium: 720,
      big: 960,
      bigger: 1140,
    },
  },
  text: {
    bold: 600,
    // https://medium.design/system-shock-6b1dc6d6596f
    // fontFamily taken from facebook.com (19 December 2016)
    fontFamily: '-apple-system, BlinkMacSystemFont, ".SFNSText-Regular", sans-serif',
  },
  heading: {
    fontFamily: '-apple-system, BlinkMacSystemFont, ".SFNSText-Regular", sans-serif',
    marginBottom: 1,
  },
  paragraph: {
    marginBottom: 1,
    maxWidth: '42em',
  },
};

export default theme;
