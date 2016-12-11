/* @flow */
import type { Styled } from '../themes/types';
import styled from './styled';

const Container = styled((theme, props) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  // TODO: Use media queries.
  maxWidth: theme.container.maxWidths.big,
  minHeight: '100vh', // make footer sticky
  paddingLeft: theme.sizes.smaller,
  paddingRight: theme.sizes.smaller,
}));

export default Container;
