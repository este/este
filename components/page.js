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
  // style={{ margin: 'auto', width: 600 }}
  >
    {children}
  </Box>
);

const Page = ({ children, title }: PageProps) => (
  <Box>
    <Head>
      <title>{title}</title>
    </Head>
    <LoadingBar />
    <Container>
      <Header />
      {children}
    </Container>
  </Box>
);

export default Page;
