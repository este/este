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
const { rhythm } = typography;

const colors = {
  primary: openColor.blue[6],
  success: openColor.green[5],
  warning: openColor.orange[6],
  danger: openColor.red[6],
  black: openColor.gray[8],
  white: openColor.white,
  gray: openColor.gray[5],
};

// Namespaced styles ftw.

const styles = {
  text: StyleSheet.create({
    // https://css-tricks.com/snippets/css/system-font-stack
    font: {
      color: colors.black,
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
};

export type Styles = typeof styles;

export const browserTheme: Theme = {
  typography,
  colors,
  styles,
  pageBackgroundColor: 'white',
  // TODO: Remove
  p: {
    marginBottom: 1,
    maxWidth: 28,
  },
  set: {
    marginBottom: 1,
    horizontalSpaceBetween: 0.5,
    verticalSpaceBetween: 1,
  },
  button: {
    borderRadius: 2,
    borderWidth: 1,
    marginVertical: 0.3,
    paddingVertical: 0.2,
    disabledOpacity: 0.5,
  },
  form: {
    marginBottom: 1,
    maxWidth: 21,
  },
  textInput: {
    disabledOpacity: 0.5,
  },
  checkbox: {
    // TODO: Use babel-plugin-inline-react-svg.
    checkedIcon: (
      <svg viewBox="0 0 32 32">
        <path d="M2 15 L6 11 L14 19 L28 5 L32 9 L14 27 z" />
      </svg>
    ),
    uncheckedIcon: (
      <svg viewBox="-32 -32 544 544">
        <path d="M405.333,106.667v298.666H106.667V106.667H405.333 M405.333,64H106.667C83.198,64,64,83.198,64,106.667v298.666    C64,428.802,83.198,448,106.667,448h298.666C428.802,448,448,428.802,448,405.333V106.667C448,83.198,428.802,64,405.333,64 L405.333,64z" />
      </svg>
    ),
  },
  radio: {
    checkedIcon: (
      <svg viewBox="10 10 70 70">
        <path
          d="M45,24c11.579,0,21,9.42,21,21c0,11.579-9.421,21-21,21c-11.58,0-21-9.421-21-21C24,33.42,33.42,24,45,24 M45,20c-13.807,0-25,11.193-25,25c0,13.807,11.193,25,25,25c13.807,0,25-11.193,25-25C70,31.193,58.807,20,45,20L45,20z"
          fill="#000"
        />
        <circle cx="45" cy="45" r="16.77" />
      </svg>
    ),
    uncheckedIcon: (
      <svg viewBox="10 10 70 70">
        <path d="M45,24c11.579,0,21,9.42,21,21c0,11.579-9.421,21-21,21c-11.58,0-21-9.421-21-21C24,33.42,33.42,24,45,24 M45,20c-13.807,0-25,11.193-25,25s11.193,25,25,25s25-11.193,25-25S58.807,20,45,20L45,20z" />
      </svg>
    ),
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
