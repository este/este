/* @flow */
import type { Theme } from '../themes';
import React from 'react';
import style from './style';

export type TextProps = {
  bold?: boolean,
  inverted?: boolean,
  small?: boolean,
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase',
};

// Style is the transformation of props and theme.
export const textStyle = (props: TextProps, theme: Theme) => ({
  color: props.inverted ? theme.colors.white : theme.colors.black,
  fontFamily: theme.fontFamily,
  fontSize: props.small ? theme.fontSizes.smallText : theme.fontSizes.text,
  fontWeight: props.bold ? theme.bold : 'normal',
  lineHeight: theme.lineHeight,
  textTransform: props.transform || 'none',
});

// Must be span, not p, because p can't be nested.
const Text = style(textStyle, 'span');

// Export Text wrapped in function because we want flow props check.
// Such design is the must, beacuse it allows us to reuse styles.
export default (props: TextProps) => <Text {...props} />;
