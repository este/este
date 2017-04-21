// @flow
import Box from './box';
import Text from './text';
// import { Link } from '../components';

const PageFooter = () => (
  <Box
    // borderTopWidth={1}
    // borderStyle="solid"
    flexDirection="row"
    marginTop={1}
    paddingVertical={1}
  >
    <Text size={-1}>Made with love by</Text>
    {/* {'\u00a0'}
    <Link size={-1} to="https://twitter.com/steida">steida</Link> */}
  </Box>
);

export default PageFooter;
