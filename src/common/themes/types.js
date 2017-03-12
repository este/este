// @flow
import type { OpenColor } from './openColor';

// Theme.

// Because { [color: Color]?: boolean } doesn't work, we have to define props.
export type ColorProps = {
  // Don't hesitate to add your own.
  primary?: boolean,
  success?: boolean,
  warning?: boolean,
  danger?: boolean,
  black?: boolean,
  white?: boolean,
  gray?: boolean,
};

export type Color = $Keys<ColorProps>;

export type Theme = {|
  typography: {|
    fontSize: (number) => number,
    lineHeight: number,
    rhythm: (number) => number,
  |},
  colors: {
    [color: Color]: string,
    open: OpenColor,
  },
  states: {
    active: {|
      darken: number,
      opacity: number,
    |},
    disabled: {|
      opacity: number,
    |},
  },
  container: {|
    maxWidths: {|
      small: number,
      medium: number,
      big: number,
      bigger: number,
    |},
  |},
  text: {|
    bold:
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
      | 900,
    fontFamily: string,
  |},
  block: {|
    marginBottom: number,
    maxWidth: number,
  |},
  button: {|
    borderRadius: number,
  |},
  heading: {|
    fontFamily: string,
    marginBottom: number,
  |},
  paragraph: {|
    marginBottom: number,
  |},
  // input: {| In case someone needs that.
  // |},
|};
