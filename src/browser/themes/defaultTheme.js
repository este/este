// @flow
import type { Theme } from '../../common/themes/types';
import openColor from '../../common/themes/openColor';
import typography from '../../common/themes/typography';

// www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
// Taken from from Bootstrap 4.
export const nativeFontFamily = [
  '-apple-system',
  'system-ui',
  'BlinkMacSystemFont',
  '"Segoe UI"', // Segoe UI looks good but is not perfectly vertically aligned in Windows shit.
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(', ');

const theme: Theme = {
  typography: typography({
    fontSize: 16,
    fontSizeScale: 'step5', // perfect fourth, modularscale.com
    lineHeight: 24,
  }),
  colors: {
    primary: openColor.blue6,
    success: openColor.green5,
    warning: openColor.orange6,
    danger: openColor.red6,
    black: openColor.gray8,
    white: openColor.white,
    gray: openColor.gray5,
    open: openColor,
  },
  states: {
    active: {
      darken: 0.2,
      opacity: 0.7,
    },
    disabled: {
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
    fontFamily: nativeFontFamily,
  },
  block: {
    marginBottom: 1,
    maxWidth: 21,
  },
  button: {
    borderRadius: 2,
  },
  heading: {
    fontFamily: nativeFontFamily,
    marginBottom: 1,
  },
  paragraph: {
    marginBottom: 1,
  },
};

export default theme;
