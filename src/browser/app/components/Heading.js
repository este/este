/* @flow */
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Heading: Styled<TextProps> = styled((theme, {
  bold,
  display,
  lineHeight,
}) => ({
  $extends: Text,
  fontWeight: bold === undefined ? theme.bold : bold ? theme.bold : 'normal',
  display: display || 'block',
  lineHeight: lineHeight || theme.Heading.lineHeight,
}));

export default Heading;
