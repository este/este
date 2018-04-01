// @flow
import type { StyleSheetStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type { Styles } from './theme';

type C = string;
type ColorScale = [C, C, C, C, C, C, C, C, C, C];

export type OpenColor = {
  white: string,
  black: string,
  gray: ColorScale,
  red: ColorScale,
  pink: ColorScale,
  grape: ColorScale,
  violet: ColorScale,
  indigo: ColorScale,
  blue: ColorScale,
  cyan: ColorScale,
  teal: ColorScale,
  green: ColorScale,
  lime: ColorScale,
  yellow: ColorScale,
  orange: ColorScale,
};

type Colors = {|
  primary: string,
  success: string,
  warning: string,
  danger: string,
  black: string,
  white: string,
  gray: string,
|};

export type ColorName = $Keys<Colors>;

export type Theme = {
  typography: {|
    fontSize: number => number,
    lineHeight: number,
    rhythm: number => number,
    fontSizeWithLineHeight: number => StyleSheetStyle,
  |},
  colors: Colors,
  textColor: ColorName,
  pageBackgroundColor: ColorName,
  styles: Styles,
};
