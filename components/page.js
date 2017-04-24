// @flow
import A from '../components/a';
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
const PageBody = ({ children }) => (
  <Box flex={1} maxWidth={30} paddingTop={2}>{children}</Box>
);

const PageFooter = () => (
  <Text
    borderColor="gray"
    borderStyle="solid"
    borderTopWidth={1}
    flexDirection="row"
    marginTop={1}
    paddingVertical={1}
    size={-1}
  >
    Made with love by
    {' '}
    <A size={-1} href="https://twitter.com/steida">steida</A>
  </Text>
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
