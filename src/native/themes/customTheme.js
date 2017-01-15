// @flow
import type { Theme } from '../../common/themes/types';
import openColor from '../../common/themes/openColor';
import typography from '../../common/themes/typography';

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
  border: {
    radius: 2,
  },
  states: {
    active: {
      darken: 0.2,
    },
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
    fontFamily: 'System',
  },
  block: {
    marginBottom: 1,
    maxWidth: 21,
  },
  heading: {
    fontFamily: 'System',
    marginBottom: 1,
  },
  paragraph: {
    marginBottom: 1,
  },
};

export default theme;
