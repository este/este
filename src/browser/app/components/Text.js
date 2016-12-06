/* @flow */
import type { Color, Size, Style, TextTransform } from '../themes/types';
import React from 'react';
import style from './style';

// Why not <Text small underline>? For two reasons:
//  - It's better to be explicit than smart. What about <Text small big>? Yes.
//  - Flow 0.35 doesn't support that, & { [size: Size]: boolean } doesn't work.

export type TextProps = {
  bold?: boolean,
  color?: Color,
  display?: 'block' | 'inline' | 'inline-block',
  size?: Size,
  style?: Style,
  transform?: TextTransform,
};

const Text = style((props: TextProps, theme) => ({
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  display: props.display || 'inline',
  fontFamily: theme.fontFamily,
  fontSize: props.size ? theme.fontSizes[props.size] : theme.fontSizes.medium,
  fontWeight: props.bold ? theme.bold : 'normal',
  lineHeight: theme.lineHeight,
  textTransform: props.transform || 'none',
}));

export default Text;
