/* @flow */
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

// aha, neni to block padding?
// Paragraph je text display="block", ok

const Paragraph = styled(theme => ({
  $extends: Text,
  // marginBottom:
  // marginBottom: props
}));

// Paragraph.defaultProps = ({
//   display: 'block',
//   // marginBottom: 'big', // patri to do theme?
// }: Exact<TextProps>);

export default Paragraph;
