/* @flow */
import type { Theme } from '../themes';
import React from 'react';
import { createComponent } from 'react-fela';

export type TextProps = {
  bold?: boolean,
  inverted?: boolean,
  small?: boolean,
};

export const textStyles = (props: TextProps & { theme: Theme }) => ({
  color: props.inverted ? props.theme.colors.white : props.theme.colors.black,
  fontFamily: props.theme.fontFamily,
  fontSize: `${props.small ? props.theme.fontSizes.smallText : props.theme.fontSizes.text}px`,
  fontWeight: props.bold ? props.theme.bold : 'normal',
  lineHeight: props.theme.lineHeight,
});

const Text = createComponent(textStyles, 'span');

export default (props: TextProps) => {
  return <Text {...props} />;
};
