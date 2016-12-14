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
  color: theme.colors.white,
  display: props.display || 'inline-block',
  fontWeight: props.bold === undefined ? 'bold' : props.bold ? theme.text.bold : 'normal',
  marginBottom: theme.sizes.step3,
  marginTop: theme.sizes.step3,
  paddingBottom: theme.sizes.smallest,
  paddingLeft: theme.fontSizes.medium,
  paddingRight: theme.fontSizes.medium,
  paddingTop: theme.sizes.smallest,
}));

// Oser je, tohle prepisovat, nemuzu podedit element?
{/* <Text
  size="small"
>initial theme</Text> */}

export default Button;
