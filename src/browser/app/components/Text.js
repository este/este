/* @flow */
import type {
  Color,
  Exact,
  Size,
  Style as StyleType,
  TextTransform,
  Theme,
} from '../themes/types';
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
  style?: StyleType,
  transform?: TextTransform,
};

export const textStyle = (theme: Theme, props: TextProps) => ({
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  display: props.display || 'inline',
  fontFamily: theme.fontFamily,
  fontSize: props.size ? theme.fontSizes[props.size] : theme.fontSizes.medium,
  fontWeight: props.bold ? theme.bold : 'normal',
  lineHeight: theme.lineHeight,
  textTransform: props.transform || 'none',
});

const Style = style(textStyle);

const Text = (props: Exact<TextProps>) => <Style {...props} />;

export default Text;
