// @flow
import Baseline from '../components/baseline';
import Box from './box';
import Head from 'next/head';
import LoadingBar from '../components/loading-bar';
import PageFooter from './page-footer';
import PageHeader from './page-header';

type PageProps = {|
  children?: any,
  title: string,
|};

const PageContainer = ({ children }) => (
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

// Flex 1 to make footer sticky.
const PageBody = ({ children }) => <Box flex={1}>{children}</Box>;

const Page = ({ children, title }: PageProps) => (
  <Box>
    <Baseline>
      <Head>
        <title>{title}</title>
      </Head>
      <LoadingBar />
      <PageContainer>
        <PageHeader />
        <PageBody>{children}</PageBody>
        <PageFooter />
      </PageContainer>
    </Baseline>
  </Box>
);

export default Page;
