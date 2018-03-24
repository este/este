// @flow
import type { StyleSheetStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type { Styles } from './theme';

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
  styles: Styles,
  textColor: ColorName,
  pageBackgroundColor: ColorName,
};
