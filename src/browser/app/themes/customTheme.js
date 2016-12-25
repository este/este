/* @flow */
import type { Theme } from './types';
import openColor from './openColor';
import typography from './typography';
import { nativeFontFamily } from './defaultTheme';

// TODO: Please pull request for something more beautiful.
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
    fontFamily: nativeFontFamily,
  },
  heading: {
    fontFamily: nativeFontFamily,
    marginBottom: 1,
  },
  paragraph: {
    marginBottom: 1,
    maxWidth: '42em',
  },
  input: {
    borderError: `solid 1px ${openColor.red7}`,
    border: `solid 1px ${openColor.gray4}`,
  },
};

export default theme;
