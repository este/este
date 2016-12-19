/* @flow */
import type { Exact, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Paragraph: Styled<TextProps> = styled((theme, props) => ({
  $extends: Text,
  maxWidth: props.maxWidth || theme.paragraph.maxWidth,
  ...(props.marginBottom == null ? {
    marginBottom: theme.typography.rhythm(theme.paragraph.marginBottom),
  } : {}),
}));

Paragraph.defaultProps = ({
  display: 'block',
}: Exact<TextProps>);

export default Paragraph;
