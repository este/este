/* @flow */
import type { Strict, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

type ButtonProps = TextProps & {
  disabled?: boolean,
  onClick?: (e: SyntheticMouseEvent) => any,
};

const Button: Styled<ButtonProps> = styled((theme, {
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
  ...(disabled ? theme.states.disabled : {}),
  userSelect: 'none', // Because button is rendered as div in browser.
}), 'button', [
  'disabled',
  'onClick',
]);

export default Button;
