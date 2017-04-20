// @flow
import Baseline from '../components/baseline';
import Box from './box';
import Head from 'next/head';
import Header from './header';
import LoadingBar from '../components/loading-bar';

type PageProps = {|
  children?: any,
  title: string,
|};

const Container = ({ children }) => (
  <Box
    style={() => ({
      margin: 'auto',
      paddingHorizontal: 1,
      rawStyle: {
        maxWidth: 960,
        minHeight: '100vh', // make footer sticky
      },
    })}
  >
    {children}
  </Box>
);

const Page = ({ children, title }: PageProps) => (
  <Box>
    <Head>
      <title>{title}</title>
    </Head>
    <Baseline>
      <LoadingBar />
      <Container>
        <Header />
        {children}
      </Container>
    </Baseline>
  </Box>
);

export default Page;
