/* @flow */
import type { Exact, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';

const Heading: Styled<TextProps> = styled((theme, props) => ({
  $extends: Text,
  display: props.display || 'block',
  fontFamily: theme.heading.fontFamily,
  ...(props.marginBottom == null ? {
    marginBottom: theme.typography.rhythm(theme.heading.marginBottom),
  } : {}),
}));

Heading.defaultProps = ({
  bold: true,
}: Exact<TextProps>);


export default Heading;
