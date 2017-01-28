// @flow
import type { Theme } from '../../common/themes/types';
import openColor from '../../common/themes/openColor';
import typography from '../../common/themes/typography';
import { nativeFontFamily } from './defaultTheme';

const theme: Theme = {
  typography: typography({
    fontSize: 18,
    fontSizeScale: 'step5',
    lineHeight: 27, // 18 * 1.5
  }),
  colors: {
    primary: openColor.blue8,
    success: openColor.green5,
    warning: openColor.orange6,
    danger: openColor.red6,
    black: openColor.gray8,
    white: openColor.white,
    gray: openColor.gray4,
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
