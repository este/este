/* @flow */
import type { Exact, Size, TextTransform, Theme } from '../themes/types';
import React from 'react';
import style from './style';

export type TextProps = {
  bold?: boolean,
  inverted?: boolean,
  size?: Size,
  transform?: TextTransform,
};

export const textStyle = (theme: Theme, props: TextProps) => ({
  color: props.inverted ? theme.colors.white : theme.colors.black,
  fontFamily: theme.fontFamily,
  fontSize: props.size ? theme.fontSizes[props.size] : theme.fontSizes.medium,
  fontWeight: props.bold ? theme.bold : 'normal',
  lineHeight: theme.lineHeight,
  textTransform: props.transform || 'none',
});

const Style = style(textStyle, 'span'); // span, because p can't be nested

const Text = (props: Exact<TextProps>) => <Style {...props} />;

export default Text;
