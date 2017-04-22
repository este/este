// @flow
import A from './a';
import Box from './box';
import Link from './link';

// {
//   /* <Link prefetch href="/"><A>home</A></Link>
// <Link prefetch href="/about"><A>about</A></Link> */
// }

const HeaderLink = ({ children }) => (
  <A
    backgroundColor="primary"
    bold
    color="white"
    paddingHorizontal={0.5}
    paddingVertical={0.5}
  >
    {children}
  </A>
);

const PageHeader = () => (
  <Box
    backgroundColor="primary"
    flexDirection="row"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
    // TODO: Demonstrate it.
    // style={theme => ({
    //   backgroundColor: theme.colors.gray,
    // })}
  >
    <HeaderLink>Home</HeaderLink>
    <HeaderLink>About</HeaderLink>
  </Box>
);

export default PageHeader;
