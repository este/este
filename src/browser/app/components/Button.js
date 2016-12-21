/* @flow */
import type { Exact, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

type ButtonProps = TextProps & {
  disabled?: boolean,
  onClick?: (e: SyntheticMouseEvent) => any,
};

const Button: Styled<ButtonProps> = styled((theme, props) => ({
  $extends: Text,
  borderRadius: props.borderRadius || theme.border.radius,
  color: props.color ? theme.colors[props.color] : theme.colors.white,
  cursor: 'pointer',
  userSelect: 'none',
  ...(props.disabled ? theme.states.disabled : {}),
}), 'button', [
  'disabled',
  'onClick',
]);

Button.defaultProps = ({
  backgroundColor: 'primary',
  bold: true,
  display: 'inline-block',
  marginVertical: 0.25,
  paddingHorizontal: '1.75em',
  paddingVertical: 0.25,
  transform: 'capitalize',
}: Exact<ButtonProps>);

export default Button;
