// @flow
import type { Strict, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Heading: Styled<TextProps> = styled((theme, {
  bold = true,
  display = 'block',
  fontFamily = theme.heading.fontFamily,
  marginBottom = theme.heading.marginBottom,
}) => ({
  $extends: [Text, ({
    bold,
    display,
    fontFamily,
    marginBottom,
  }: Strict<TextProps>)],
}));

export default Heading;
