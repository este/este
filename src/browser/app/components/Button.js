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
  marginVertical = 1 / 4,
  paddingHorizontal = 1,
  paddingVertical = 1 / 4,
  transform = 'capitalize',
}) => ({
  $extends: [Text, ({
    bold,
    display,
    marginVertical,
    paddingHorizontal,
    paddingVertical,
    transform,
  }: Strict<TextProps>)],
  $map: style => {
    // if (active)
    // potrebuju atomic rules, takze ne string border, pak muzu automaticky
    // jen button, ok
    // fakt vsechny barvy? jo
    // proc to kresli border, kde
    // console.log(style);
    return style;
  },
  ...(disabled ? theme.states.disabled : null),
  userSelect: 'none', // Because button is rendered as a div in the browser.
}), 'button', [
  'disabled',
  'onClick',
]);

export default Button;
