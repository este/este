/* @flow */
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Heading: Styled<TextProps> = styled((theme, props) => ({
  $extends: Text,
  display: props.display || 'block',
  fontFamily: theme.heading.fontFamily,
  fontWeight: props.bold === undefined ? 'bold' : props.bold ? theme.text.bold : 'normal',
  // marginBottom: theme.sizes[props.marginBottom || theme.heading.marginBottom],
}));

export default Heading;
