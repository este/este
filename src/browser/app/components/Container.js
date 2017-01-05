// @flow
import styled from './styled';

const Container = styled(theme => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  maxWidth: theme.container.maxWidths.big,
  minHeight: '100vh', // make footer sticky
  paddingLeft: theme.typography.rhythm(1),
  paddingRight: theme.typography.rhythm(1),
}));

export default Container;
