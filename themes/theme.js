// @flow
import type { Theme } from './types';
import createTypography from './createTypography';
import openColor from 'open-color';
import { StyleSheet } from 'react-native';

// Please, make a Flow libdef and send pull request to
// https://github.com/flowtype/flow-typed. I don't have a time.
// white: string,
// black: string,
// gray: Array<string>,
// red: Array<string>,
// pink: Array<string>,
// grape: Array<string>,
// violet: Array<string>,
// indigo: Array<string>,
// blue: Array<string>,
// cyan: Array<string>,
// teal: Array<string>,
// green: Array<string>,
// lime: Array<string>,
// yellow: Array<string>,
// orange: Array<string>,

const typography = createTypography({
  fontSize: 16,
  fontSizeScale: 'step5', // perfect fourth, modularscale.com
  lineHeight: 24,
});

const colors = {
  primary: openColor.blue[6],
  success: openColor.green[5],
  warning: openColor.orange[6],
  danger: openColor.red[6],
  black: openColor.gray[8],
  white: openColor.white,
  gray: openColor.gray[5],
};

const textColor = 'black';

const bold = '600';

// Namespaced styles ftw.

const { rhythm } = typography;

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const styles = {
  text: StyleSheet.create({
    // https://css-tricks.com/snippets/css/system-font-stack
    font: {
      color: colors[textColor],
      fontFamily,
    },
    weightNormal: { fontWeight: 'normal' },
    weightBold: { fontWeight: bold },
    primary: { color: colors.primary },
    success: { color: colors.success },
    warning: { color: colors.warning },
    danger: { color: colors.danger },
    black: { color: colors.black },
    white: { color: colors.white },
    gray: { color: colors.gray },
  }),

  heading: StyleSheet.create({
    text: {
      fontWeight: bold,
      marginBottom: rhythm(1),
    },
  }),

  p: StyleSheet.create({
    text: {
      marginBottom: rhythm(1),
      maxWidth: rhythm(28),
    },
  }),

  page: StyleSheet.create({
    container: {
      width: 960,
    },
    body: {
      paddingTop: rhythm(2),
    },
    footer: {
      borderColor: colors.gray,
      borderTopWidth: 1,
      borderStyle: 'solid',
      marginTop: rhythm(2),
      paddingVertical: rhythm(1),
    },
  }),

  mainNav: StyleSheet.create({
    view: {
      backgroundColor: colors.primary,
      marginVertical: rhythm(0.5),
      paddingHorizontal: rhythm(0.5),
    },
    a: {
      paddingHorizontal: rhythm(0.5),
      paddingVertical: rhythm(0.5),
    },
  }),

  form: StyleSheet.create({
    view: {
      marginBottom: rhythm(1),
      maxWidth: rhythm(21),
    },
  }),

  states: StyleSheet.create({
    disabled: {
      opacity: 0.5,
    },
  }),

  textInput: StyleSheet.create({
    input: {
      color: colors[textColor],
      fontFamily,
      marginBottom: rhythm(1),
    },
  }),

  textInputBig: StyleSheet.create({
    input: {
      borderBottomWidth: 1,
      borderColor: colors.gray,
      paddingVertical: rhythm(0.5),
      marginBottom: 0,
    },
    error: {
      minHeight: rhythm(1),
    },
  }),

  button: StyleSheet.create({
    text: {
      color: colors.black,
      fontWeight: bold,
    },
    spaced: {
      borderRadius: 2,
      borderWidth: 1,
      paddingVertical: rhythm(0.2),
      paddingHorizontal: rhythm(1),
    },
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    success: {
      backgroundColor: colors.success,
      color: colors.white,
    },
    warning: {
      backgroundColor: colors.warning,
      color: colors.white,
    },
    danger: {
      backgroundColor: colors.danger,
      color: colors.white,
    },
    black: {
      backgroundColor: colors.black,
      color: colors.white,
    },
    white: {
      backgroundColor: colors.white,
      color: colors.white,
    },
    gray: {
      backgroundColor: colors.gray,
      color: colors.white,
    },
  }),
};

export type Styles = typeof styles;

export const lightTheme: Theme = {
  typography,
  colors,
  styles,
  textColor,
  pageBackgroundColor: 'white',
};

// Dark theme

const darkColors = {
  primary: openColor.blue[6],
  success: openColor.green[5],
  warning: openColor.orange[6],
  danger: openColor.red[6],
  black: openColor.gray[8],
  white: openColor.white,
  gray: openColor.gray[5],
};

const darkTextColor = 'white';

export const darkTheme: Theme = {
  ...lightTheme,
  styles: {
    ...lightTheme.styles,
    text: StyleSheet.create({
      // https://css-tricks.com/snippets/css/system-font-stack
      font: {
        color: colors[darkTextColor],
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      },
      weightNormal: { fontWeight: 'normal' },
      weightBold: { fontWeight: bold },
      primary: { color: darkColors.primary },
      success: { color: darkColors.success },
      warning: { color: darkColors.warning },
      danger: { color: darkColors.danger },
      black: { color: darkColors.black },
      white: { color: darkColors.white },
      gray: { color: darkColors.gray },
    }),

    textInput: StyleSheet.create({
      input: {
        color: darkTextColor,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        marginBottom: rhythm(1),
      },
    }),

    button: StyleSheet.create({
      text: {
        color: colors.white,
        fontWeight: bold,
      },
      spaced: {
        borderRadius: 2,
        borderWidth: 1,
        paddingVertical: rhythm(0.2),
        paddingHorizontal: rhythm(1),
      },
      primary: {
        backgroundColor: colors.primary,
        color: colors.white,
      },
      success: {
        backgroundColor: colors.success,
        color: colors.white,
      },
      warning: {
        backgroundColor: colors.warning,
        color: colors.white,
      },
      danger: {
        backgroundColor: colors.danger,
        color: colors.white,
      },
      black: {
        backgroundColor: colors.black,
        color: colors.white,
      },
      white: {
        backgroundColor: colors.white,
        color: colors.white,
      },
      gray: {
        backgroundColor: colors.gray,
        color: colors.white,
      },
    }),
  },
  colors: darkColors,
  textColor: darkTextColor,
  pageBackgroundColor: 'black',
};
