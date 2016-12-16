/* @flow */
import type { Theme } from './types';
import openColor from './openColor';
import typography from './typography';

const theme: Theme = {
  typography: typography({
    // For text 14px and small text 12px use 14px with 1,16666 fontSizeScale
    fontSize: 16,
    fontSizeScale: 'step5', // perfect fourth, modularscale.com
    lineHeight: 24,
  }),
  colors: {
    // TODO: Leverage openColor.
    primary: '#08e',
    info: '#08e',
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
    // www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  },
  heading: {
    bold: 700,
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    marginBottom: 1,
  },
  paragraph: {
    marginBottom: 1,
    maxWidth: '42em',
  },
};

export default theme;
