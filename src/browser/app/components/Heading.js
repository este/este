/* @flow */
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Heading: Styled<TextProps> = styled((theme, {
  bold = true,
  display = 'block',
  marginBottom = theme.heading.marginBottom,
}) => ({
  $extends: Text,
  display,
  fontFamily: theme.heading.fontFamily,
  fontWeight: bold ? theme.text.bold : 'normal',
  marginBottom: theme.typography.rhythm(marginBottom),
}));

export default Heading;
