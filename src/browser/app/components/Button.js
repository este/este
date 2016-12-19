/* @flow */
import type { Exact, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

type ButtonProps = TextProps & {
  disabled?: boolean,
  onClick?: (e: SyntheticMouseEvent) => void,
};

const Button: Styled<ButtonProps> = styled((theme, props) => ({
  $extends: Text,
  borderRadius: props.borderRadius || theme.border.radius,
  color: theme.colors.white,
  cursor: 'pointer',
  fontSize: theme.typography.fontSize(props.size == null ? -1 : props.size),
  ...(props.disabled ? theme.states.disabled : {}),
}), 'button', [
  'disabled',
  'onClick',
]);

Button.defaultProps = ({
  backgroundColor: 'primary',
  bold: true,
  display: 'inline-block',
  paddingHorizontal: '1.75em',
}: Exact<TextProps>);

export default Button;
