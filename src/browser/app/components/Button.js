/* @flow */
import type { ColorProps, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';


type ButtonProps = TextProps & ColorProps & {
  disabled?: boolean,
  onClick?: (e: SyntheticMouseEvent) => any,
};

const Button: Styled<ButtonProps> = styled((theme, {
  borderRadius = theme.border.radius,
  color,
  disabled,
  transform = "capitalize",
}) => ({
  $extends: Text,
  textTransform: transform,
  // borderRadius: borderRadius || theme.border.radius,
  // color: color ? theme.colors[color] : theme.colors.white,
  // ...(disabled ? theme.states.disabled : {}),
}), 'button', [
  'disabled',
  'onClick',
]);

// potrebuju? nepatri vse do theme?
// Button.defaultProps = ({
//   // backgroundColor: 'primary',
//   // bold: true,
//   // display: 'inline-block',
//   // marginVertical: 1 / 4,
//   // paddingHorizontal: 1,
//   // paddingVertical: 1 / 4,
//   // transform: 'capitalize',
// }: Exact<ButtonProps>);

export default Button;
