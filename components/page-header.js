// @flow
import A from './a';
import Box from './box';

const HeaderA = ({ children, href, title }) => (
  <A
    backgroundColor="primary"
    bold
    color="white"
    href={href}
    isActive={title === children}
    paddingHorizontal={0.5}
    paddingVertical={0.5}
    prefetch
  >
    {children}
  </A>
);

type PageHeaderProps = { title: string };

const PageHeader = ({ title }: PageHeaderProps) => (
  <Box
    backgroundColor="primary"
    flexDirection="row"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    <HeaderA href="/" title={title}>Home</HeaderA>
    <HeaderA href="/about" title={title}>About</HeaderA>
  </Box>
);

export default PageHeader;
