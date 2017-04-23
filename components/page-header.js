// @flow
import A from './a';
import Box from './box';

const HeaderA = ({ children, href }) => (
  <A
    backgroundColor="primary"
    bold
    href={href}
    color="white"
    paddingHorizontal={0.5}
    paddingVertical={0.5}
    prefetch
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
  >
    <HeaderA href="/">Home</HeaderA>
    <HeaderA href="/about">About</HeaderA>
  </Box>
);

export default PageHeader;
