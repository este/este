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
  pageBackgroundColor: ColorName,
  // TODO: Probably remove all.
  p: {|
    marginBottom: number,
    maxWidth: number,
  |},
  set: {|
    marginBottom: number,
    horizontalSpaceBetween: number,
    verticalSpaceBetween: number,
  |},
  button: {|
    borderRadius: number,
    borderWidth: number,
    marginVertical: number,
    paddingVertical: number,
    disabledOpacity: number,
  |},
  form: {|
    marginBottom: number,
    maxWidth: number,
  |},
  textInput: {|
    disabledOpacity: number,
  |},
  checkbox: {|
    checkedIcon: Element<'svg'>,
    uncheckedIcon: Element<'svg'>,
  |},
  radio: {|
    checkedIcon: Element<'svg'>,
    uncheckedIcon: Element<'svg'>,
  |},
};
