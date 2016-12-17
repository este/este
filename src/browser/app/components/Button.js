/* @flow */
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Button: Styled<TextProps> = styled((theme, props) => ({
  $extends: Text,
  backgroundColor: props.backgroundColor
    ? theme.colors[props.backgroundColor]
    : theme.colors.primary,
  borderRadius: props.borderRadius || theme.border.radius,
  borderWidth: 0,
  color: theme.colors.white,
  cursor: 'pointer',
  display: props.display || 'inline-block',
  fontSize: theme.typography.fontSize(props.size || -1),
  fontWeight: props.bold === undefined
    ? 'bold'
    : props.bold ? theme.text.bold : 'normal',
  // marginBottom: theme.sizes.step3,
  // marginTop: theme.sizes.step3,
  // paddingBottom: theme.sizes.smallest,
  // paddingTop: {1 / 4},
  paddingLeft: '1em',
  paddingRight: '1em',
}), 'button', ['onClick']);

export default Button;
