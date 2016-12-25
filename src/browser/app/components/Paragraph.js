/* @flow */
import type { Strict, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Paragraph: Styled<TextProps> = styled((theme, {
  display = 'block',
  marginBottom = theme.paragraph.marginBottom,
  maxWidth = theme.paragraph.maxWidth,
}) => ({
  $extends: [Text, ({
    display,
    marginBottom,
  }: Strict<TextProps>)],
  maxWidth,
}));

export default Paragraph;
