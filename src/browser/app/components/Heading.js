/* @flow */
import type { Exact, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Heading: Styled<TextProps> = styled((theme, props) => ({
  $extends: Text,
  // lineHeight: props.lineHeight || theme.heading.lineHeight,
}));

// Hmm, co pak ale pageHeader? no? hmm
// musel by prepsat heading marginBottom
// ok, page header pouziva text, imho staci, ok
// Taky musi mit padding, hmm
// // Tohle asi nechci podporovat, hmm, ok
Heading.defaultProps = ({
  bold: true,
  display: 'block',
}: Exact<TextProps>); // github.com/gcanti/flow-style/issues/4#issuecomment-266144201

export default Heading;
