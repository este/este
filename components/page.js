// @flow
import Head from 'next/head';
import Header from './header';
import LoadingBar from '../components/loading-bar';
import Box from './box';

type PageProps = {|
  children?: any,
  title: string,
|};

const Container = ({ children }) => (
  <Box
    // margin="auto"
    // paddingHorizontal={1}
    // style={theme => ({
    //   maxWidth: theme.container.maxWidths.big,
    //   minHeight: '100vh', // make footer sticky
    // })}
    style={{ margin: 'auto', width: 600 }}
  >
    {children}
  </Box>
);

const Page = ({ children, title }: PageProps) => (
  <Box>
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name="viewport"
        // kihlstrom.com/2015/shrink-to-fit-no-fixes-zoom-problem-in-ios-9
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <LoadingBar />
    <Container>
      <Header />
      {children}
    </Container>
  </Box>
);

export default Page;
