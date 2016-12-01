/* @flow */
import type { Theme } from '../themes';
import React from 'react';
import style from './style';

export type TextProps = {
  bold?: boolean,
  inverted?: boolean,
  small?: boolean,
};

export const textStyle = (props: TextProps, theme: Theme) => ({
  color: props.inverted ? theme.colors.white : theme.colors.black,
  fontFamily: theme.fontFamily,
  fontSize: `${props.small ? theme.fontSizes.smallText : theme.fontSizes.text}px`,
  fontWeight: props.bold ? theme.bold : 'normal',
  lineHeight: theme.lineHeight,
});

const Text = style(textStyle, 'span');

export default (props: TextProps) => <Text {...props} />;
