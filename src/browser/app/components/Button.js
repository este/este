/* @flow */
import type { ColorProps, Strict, Styled } from '../themes/types';
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';
import styled from './styled';

type ButtonProps = TextProps & ColorProps & {
  disabled?: boolean,
  onClick?: (e: SyntheticMouseEvent) => any,
};

const Button: Styled<ButtonProps> = styled((theme, {
  bold = true,
  display = 'inline-block',
  marginVertical = 1 / 4,
  paddingHorizontal = 1,
  paddingVertical = 1 / 4,
  transform = 'capitalize',
  // borderRadius = theme.border.radius,
  // color,
  // disabled,
}) => ({
  $extends: [Text, ({
    bold,
    display,
    marginVertical,
    paddingHorizontal,
    paddingVertical,
    transform,
  }: Strict<TextProps>)],
  // borderRadius,
  // color: color ? theme.colors[color] : theme.colors.white,
  // ...(disabled ? theme.states.disabled : {}),
}), 'button', [
  'disabled',
  'onClick',
]);

export default Button;
