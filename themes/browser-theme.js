// @flow
import type { Theme } from './types';
import openColor from './open-color';
import typography from './typography';

const browerTheme: Theme = {
  typography: typography({
    fontSize: 16,
    fontSizeScale: 'step5', // perfect fourth, modularscale.com
    lineHeight: 24,
  }),
  colors: {
    // yeun.github.io/open-color
    primary: openColor.blue6,
    success: openColor.green5,
    warning: openColor.orange6,
    danger: openColor.red6,
    black: openColor.gray8,
    white: openColor.white,
    gray: openColor.gray5,
  },
  text: {
    bold: 600,
    color: 'black',
    // github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  heading: {
    bold: 'bold',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    marginBottom: 1,
  },
  p: {
    marginBottom: 1,
  },
  button: {
    borderRadius: 2,
    borderWidth: 1,
    marginHorizontal: 0.25,
    marginVertical: 0.3,
    paddingVertical: 0.2,
    disabledOpacity: 0.5,
  },
  // states: {
  //   active: {
  //     darken: 0.2,
  //     opacity: 0.7,
  //   },
  //   disabled: {
  //     opacity: 0.5,
  //   },
  // },
  // button: {
  //   borderRadius: 2,
  // },
};

export default browerTheme;
