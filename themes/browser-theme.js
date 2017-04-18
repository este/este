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
    // github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  // typography: typography({
  //   fontSize: 16,
  //   fontSizeScale: 'step3',
  //   lineHeight: 24,
  // }),
  // colors: {
  //   primary: openColor.blue6,
  //   success: openColor.green5,
  //   warning: openColor.orange6,
  //   danger: openColor.red6,
  //   black: openColor.gray7,
  //   white: openColor.white,
  //   gray: openColor.gray5,
  //   open: openColor,
  // },
  // states: {
  //   active: {
  //     darken: 0.2,
  //     opacity: 0.7,
  //   },
  //   disabled: {
  //     opacity: 0.5,
  //   },
  // },
  // container: {
  //   maxWidths: {
  //     small: 540,
  //     medium: 720,
  //     big: 960,
  //     bigger: 1140,
  //   },
  // },
  // text: {
  //   bold: 600,
  //   fontFamily: 'System',
  // },
  // block: {
  //   marginBottom: 1,
  //   maxWidth: 21,
  // },
  // button: {
  //   borderRadius: 2,
  // },
  // heading: {
  //   fontFamily: 'System',
  //   marginBottom: 1,
  // },
  // paragraph: {
  //   marginBottom: 1,
  // },
};

export default browerTheme;
