// @flow
import type { Element } from 'react';
import type { Styles } from './browserTheme';
import type { StyleSheetStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type ColorName =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'black'
  | 'white'
  | 'gray';

// TODO: Tohle imho nebudu potrebovat, pac to bude taky color. Yop.
export type ColorProps = {|
  primary?: boolean,
  success?: boolean,
  warning?: boolean,
  danger?: boolean,
  black?: boolean,
  white?: boolean,
  gray?: boolean,
|};

type Colors = {|
  primary: string,
  success: string,
  warning: string,
  danger: string,
  black: string,
  white: string,
  gray: string,
|};

export type Bold =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type Theme = {
  typography: {|
    fontSize: number => number,
    lineHeight: number,
    rhythm: number => number,
    fontSizeWithLineHeight: number => StyleSheetStyle,
  |},
  colors: Colors,
  styles: Styles,
  textColor: string,
  pageBackgroundColor: string,
  // TODO: Probably remove all.
  button: {|
    borderRadius: number,
    borderWidth: number,
    marginVertical: number,
    paddingVertical: number,
    disabledOpacity: number,
  |},
};
