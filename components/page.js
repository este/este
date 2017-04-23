// @flow
import Baseline from '../components/baseline';
import Box from './box';
import Head from 'next/head';
import LoadingBar from '../components/loading-bar';
import MainNav from '../components/main-nav';
import Text from '../components/text';

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

const Page = ({ children, title }: PageProps) => (
  <Box>
    <Baseline>
      <Head>
        <title>{title}</title>
      </Head>
      <LoadingBar />
      <PageContainer>
        <MainNav title={title} />
        <PageBody>{children}</PageBody>
        <PageFooter />
      </PageContainer>
    </Baseline>
  </Box>
);

export default Page;
