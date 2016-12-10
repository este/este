/* @flow */
import type { Exact, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Paragraph: Styled<TextProps> = styled((theme) => ({
  $extends: Text,
  // marginBottom:
  // marginBottom: props
}));

Paragraph.defaultProps = ({
  display: 'block',
  // marginBottom: 'big', // patri to do theme?
}: Exact<TextProps>);

export default Paragraph;
