/* @flow */
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Paragraph: Styled<TextProps> = styled((theme, props) => ({
  $extends: Text,
  display: props.display || 'block',
  maxWidth: props.maxWidth || theme.paragraph.maxWidth,
  ...(props.marginBottom === undefined ? {
    marginBottom: theme.typography.rhythm(theme.paragraph.marginBottom),
  } : {}),
}));

export default Paragraph;
