/* @flow */
import type { Strict, Styled } from '../themes/types';
import type { TextProps } from './Text';
// import Color from 'color';
// import React from 'react';
import Text from './Text';
import styled from './styled';

type ButtonProps = TextProps & {
  active?: boolean,
  disabled?: boolean,
  onClick?: (e: SyntheticMouseEvent) => any,
};

const Button: Styled<ButtonProps> = styled((theme, {
  // active,
  bold = true,
  disabled,
  display = 'inline-block',
  paddingHorizontal = 0.8,
  size = 0,
  transform = 'capitalize',
}) => ({
  $extends: [Text, ({
    bold,
    display,
    paddingHorizontal,
    transform,
    ...(size >= 0 ? {
      // Bigger button needs vertical space.
      marginVertical: 0.25,
      paddingVertical: 0.25,
    } : {
      // Smaller button can't have any border because it would break a rhythm.
      // It's impossible to compute it because the text can be multiline.
      borderWidth: 0,
    }),
  }: Strict<TextProps>)],
  ...(disabled ? theme.states.disabled : null),
  userSelect: 'none', // Because button is rendered as a div in the browser.
}), 'button', [
  'disabled',
  'onClick',
]);

export default Button;
