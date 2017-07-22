// @flow
import type { Element } from 'react';

type Colors = {|
  primary: string,
  success: string,
  warning: string,
  danger: string,
  black: string,
  white: string,
  gray: string,
|};

export type Color = $Keys<Colors>;

// TODO: Derive it from Colors. $Shape doesn't work, $ObjMap is buggy.
// $Values? optinal keys
export type ColorProps = {
  primary?: boolean,
  success?: boolean,
  warning?: boolean,
  danger?: boolean,
  black?: boolean,
  white?: boolean,
  gray?: boolean,
};

export type Bold =
  | 'normal'
  | 'bold'
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

export type Theme = {
  typography: {
    fontSize: number => number,
    lineHeight: number,
    rhythm: number => number,
  },
  colors: Colors,
  page: {
    backgroundColor: Color,
  },
  text: {
    bold: Bold,
    color: Color,
    fontFamily: string,
  },
  heading: {
    bold: Bold,
    fontFamily: string,
    marginBottom: number,
  },
  p: {
    marginBottom: number,
  },
  set: {
    marginBottom: number,
    horizontalSpaceBetween: number,
    verticalSpaceBetween: number,
  },
  button: {
    borderRadius: number,
    borderWidth: number,
    marginVertical: number,
    paddingVertical: number,
    disabledOpacity: number,
  },
  form: {
    marginBottom: number,
    maxWidth: number,
  },
  textInput: {
    disabledOpacity: number,
  },
  checkbox: {
    checkedIcon: Element<*>,
    uncheckedIcon: Element<*>,
  },
  radio: {
    checkedIcon: Element<*>,
    uncheckedIcon: Element<*>,
  },
};
