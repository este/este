/* @flow */
import styled from './styled';

const Container = styled(theme => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  maxWidth: theme.container.maxWidths.big, // TODO: Use media queries.
  minHeight: '100vh', // make footer sticky
  paddingLeft: theme.fontSizes.medium,
  paddingRight: theme.fontSizes.medium,
}));

export default Container;
