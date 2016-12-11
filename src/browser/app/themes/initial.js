/* @flow */
import type { Theme } from './types';
import createTypography from './createTypography';
import openColor from './openColor';

// Helper to define modular scale and vertical rhythm.
const typography = createTypography({
  baseFontSize: 16,
  lineHeightRatio: 1.5,
  scaleRatio: 1.5,
});

// www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
// TODO: Custom
const theme: Theme = {
  text: {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: typography.lineHeight,
    bold: 600,
  },
  heading: {
    // TODO: Use fontFamily and bold. Add theme opacity for text and heading.
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: typography.lineHeight,
    bold: 600,
  },
  fontSizes: typography.fontSizes,
  sizes: typography.sizes,
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
};

export default theme;
