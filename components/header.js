// @flow
import Box from './box';
// import Link from 'next/link';
// import A from './a';

import Text from './text';

// {
//   /* <Link prefetch href="/"><A>home</A></Link>
// <Link prefetch href="/about"><A>about</A></Link> */
// }

const HeaderLink = ({ children }) => (
  <Text
    backgroundColor="primary"
    bold
    color="white"
    paddingHorizontal={0.5}
    paddingVertical={0.5}
  >
    {children}
  </Text>
);

const Header = () => (
  <Box
    backgroundColor="primary"
    flexDirection="row"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    <HeaderLink>Home</HeaderLink>
    <HeaderLink>About</HeaderLink>
  </Box>
);

export default Header;
