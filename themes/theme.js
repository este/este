// @flow
import type { Theme, OpenColor } from './types';
import createTypography from './createTypography';
import openColor from 'open-color';
import { StyleSheet } from 'react-native';
import colorLib from 'color';

const openColorTyped: OpenColor = openColor;

const typography = createTypography({
  fontSize: 16,
  fontSizeScale: 'step5', // perfect fourth, modularscale.com
  lineHeight: 24,
  // fontSize: 20,
  // lineHeight: 30,
});

const colors = {
  primary: openColorTyped.blue[6],
  success: openColorTyped.green[5],
  warning: openColorTyped.orange[6],
  danger: openColorTyped.red[6],
  // TODO: Rename to foreground and background to remove all colors[white / black]?
  black: openColorTyped.gray[8],
  white: openColorTyped.white,
  gray: colorLib(openColorTyped.gray[5]).darken(0.1),
};

// Is having all themed styles in one file right?
// I think it is. That's because, when we see a lot of duplicates, it indicates
// that we should create a reusable component.

// https://css-tricks.com/snippets/css/system-font-stack
const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const fontWeight = '700';

// http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tl;dr Use it only for light text on dark background.
const fontSmoothing = {
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
};

const zIndex = {
  errorPopup: 1,
  postTextActions: 10000,
};

const stylesJson = {
  text: {
    color: colors.black,
    fontFamily,
  },

  textWeightNormal: {
    fontWeight: 'normal',
  },

  textWeightBold: {
    fontWeight,
  },

  textPrimary: {
    color: colors.primary,
  },

  textSuccess: {
    color: colors.success,
  },

  textWarning: {
    color: colors.warning,
  },

  textDanger: {
    color: colors.danger,
  },

  textBlack: {
    color: colors.black,
  },

  textWhite: {
    color: colors.white,
  },

  textGray: {
    color: colors.gray,
  },

  heading: {
    fontWeight,
    fontFamily,
    marginBottom: typography.rhythm(1),
    color: colors.gray,
  },

  block: {
    marginBottom: typography.rhythm(1),
    maxWidth: typography.rhythm(28),
  },

  appPageContainer: {
    // Only minHeight to make footer sticky.
    // No width or anything else to allow editor have any styles there.
    minHeight: '100%',
  },

  appPageContainerChild: {
    maxWidth: 768,
    // Width 100% is must otherwise width will be defined by actual content.
    // It's caused by marginHorizontal here but also by alignItems: 'center'
    // on the parent.
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: typography.rhythm(0.5),
  },

  appPageMainNav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: typography.rhythm(1),
  },

  appPageBody: {
    flex: 1, // make footer sticky
  },

  appPageFooter: {
    borderColor: colors.gray,
    borderTopWidth: 1,
    borderStyle: 'solid',
    paddingVertical: typography.rhythm(0.5),
    flexDirection: 'row',
  },

  // TODO: Rename to disabled.
  stateDisabled: {
    opacity: 0.5,
  },

  textInput: {
    color: colors.black,
    fontFamily,
  },

  textInputError: {
    minHeight: typography.rhythm(1),
  },

  picker: {
    color: colors.black,
  },

  errorPopup: {
    backgroundColor: colors.danger,
    position: 'absolute',
    zIndex: zIndex.errorPopup,
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: typography.rhythm(1),
    paddingVertical: typography.rhythm(0.5),
    // It's web only style.
    ...(fontSmoothing: any),
  },

  editorMenu: {
    position: 'absolute',
    zIndex: zIndex.postTextActions,
    backgroundColor: '#222',
    borderRadius: typography.rhythm(0.2),
    marginTop: typography.rhythm(0.25),
    paddingHorizontal: typography.rhythm(0.25),
    flexDirection: 'row',
  },

  editorMenuButton: {
    paddingVertical: typography.rhythm(0.2),
    paddingHorizontal: typography.rhythm(0.5),
    // It's web only style.
    ...(fontSmoothing: any),
  },

  editorMenuLink: {
    color: colors.white,
    fontFamily,
    fontWeight,
    paddingVertical: typography.rhythm(0.2),
    paddingHorizontal: typography.rhythm(0.2),
    // It's web only style.
    ...(fontSmoothing: any),
  },

  editorBlockquote: {
    borderLeftWidth: 2,
    borderColor: colorLib(colors.gray).lighten(0.1),
    paddingLeft: typography.rhythm(0.4),
  },

  editorListItem: {
    paddingHorizontal: typography.rhythm(0.5),
  },

  editorBreadcrumb: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: typography.rhythm(0.1),
    paddingHorizontal: typography.rhythm(0.5),
  },
};

const styles = StyleSheet.create(stylesJson);

export type Styles = typeof styles;

const placeholderTextColor = color =>
  colorLib(color)
    .fade(0.5)
    .toString();

export const lightTheme: Theme = {
  typography,
  colors,
  placeholderTextColor: placeholderTextColor(colors.black),
  pageBackgroundColor: 'white',
  styles,
};

// Dark theme

export const darkTheme: Theme = {
  ...lightTheme,
  placeholderTextColor: placeholderTextColor(colors.white),
  pageBackgroundColor: 'black',
  styles: StyleSheet.create({
    ...stylesJson,
    text: {
      ...stylesJson.text,
      color: colors.white,
      // It's web only style.
      ...(fontSmoothing: any),
    },
    textInput: {
      ...stylesJson.textInput,
      color: colors.white,
      // It's web only style.
      ...(fontSmoothing: any),
    },
    // postTextBlockquote: {
    //   ...stylesJson.postTextBlockquote,
    //   borderColor: colorLib(colors.gray).darken(0.2),
    // },
  }),
};
