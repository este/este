// @flow
import type { Theme } from '../../common/themes/types';
import openColor from '../../common/themes/openColor';
import typography from '../../common/themes/typography';

const theme: Theme = {
  typography: typography({
    fontSize: 18,
    fontSizeScale: 'step2',
    lineHeight: 24,
  }),
  colors: {
    primary: openColor.blue8,
    success: openColor.green6,
    warning: openColor.orange7,
    danger: openColor.red7,
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
    fontFamily: 'System',
  },
  block: {
    marginBottom: 1,
    maxWidth: 21,
  },
  button: {
    borderRadius: 2,
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
