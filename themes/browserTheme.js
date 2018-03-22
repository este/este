// @flow
import * as React from 'react';
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

const textColor = colors.black;

// Namespaced styles ftw.

const { rhythm } = typography;

const styles = {
  text: StyleSheet.create({
    // https://css-tricks.com/snippets/css/system-font-stack
    font: {
      color: textColor,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    weightNormal: { fontWeight: 'normal' },
    weightBold: { fontWeight: '600' },
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
      fontWeight: '600',
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
};

export type Styles = typeof styles;

export const browserTheme: Theme = {
  typography,
  colors,
  styles,
  textColor,
  pageBackgroundColor: colors.white,
  // TODO: Remove
  button: {
    borderRadius: 2,
    borderWidth: 1,
    marginVertical: 0.3,
    paddingVertical: 0.2,
    disabledOpacity: 0.5,
  },
};

export const browserThemeDark: Theme = {
  ...browserTheme,
  colors: {
    primary: openColor.blue[6],
    success: openColor.green[5],
    warning: openColor.orange[6],
    danger: openColor.red[6],
    black: openColor.gray[8],
    white: openColor.white,
    gray: openColor.gray[5],
  },
  // page: {
  //   // ...browserTheme.page,
  //   backgroundColor: 'black',
  // },
  // text: {
  //   ...browserTheme.text,
  //   color: 'white',
  // },
};
