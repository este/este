// @flow
import type { Theme } from './types';
import createTypography from './createTypography';
import openColor from 'open-color';
import { StyleSheet } from 'react-native';

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

const styles = {
  text: StyleSheet.create({
    // https://css-tricks.com/snippets/css/system-font-stack
    font: {
      color: colors[textColor],
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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

  textInput: StyleSheet.create({
    input: {
      color: textColor,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      marginBottom: rhythm(1),
    },
    disabled: {
      opacity: 0.5,
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
    },
    spaced: {
      borderRadius: 2,
      borderWidth: 1,
      marginVertical: rhythm(0.3),
      marginHorizontal: rhythm(0.5),
      paddingVertical: rhythm(0.2),
      paddingHorizontal: rhythm(1),
    },
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
      fontWeight: bold,
    },
    success: {
      backgroundColor: colors.success,
      color: colors.white,
      fontWeight: bold,
    },
    warning: {
      backgroundColor: colors.warning,
      color: colors.white,
      fontWeight: bold,
    },
    danger: {
      backgroundColor: colors.danger,
      color: colors.white,
      fontWeight: bold,
    },
    black: {
      backgroundColor: colors.black,
      color: colors.white,
      fontWeight: bold,
    },
    white: {
      backgroundColor: colors.white,
      color: colors.white,
      fontWeight: bold,
    },
    gray: {
      backgroundColor: colors.gray,
      color: colors.white,
      fontWeight: bold,
    },
  }),

  row: StyleSheet.create({
    view: {
      marginTop: rhythm(1),
      flexDirection: 'row',
    },
  }),
};

export type Styles = typeof styles;

export const browserTheme: Theme = {
  typography,
  colors,
  styles,
  textColor,
  pageBackgroundColor: 'white',
};

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

export const browserThemeDark: Theme = {
  ...browserTheme,
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
  colors: darkColors,
  textColor: darkTextColor,
  pageBackgroundColor: 'black',
};
