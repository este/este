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
  // fontSize: theme.fontSize(0),
  // fontSize: theme.fontSizes.small,
  fontWeight: props.bold === undefined ? 'bold' : props.bold ? theme.text.bold : 'normal',
  // marginBottom: theme.sizes.step3,
  // marginTop: theme.sizes.step3,
  // paddingBottom: theme.sizes.smallest,
  // paddingLeft: theme.fontSizes.medium,
  // paddingRight: theme.fontSizes.medium,
  // paddingTop: theme.sizes.smallest,
}), 'button');

export default Button;
