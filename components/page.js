// @flow
import type { State } from '../types';
import A from '../components/a';
import Baseline from '../components/baseline';
import Box from './box';
import Head from 'next/head';
import LoadingBar from '../components/loading-bar';
import MainNav from '../components/main-nav';
import Text from '../components/text';
import { ThemeProvider } from 'react-fela';
import { browserTheme, browserThemeDark } from '../themes/browser-theme';
import { connect } from 'react-redux';

const PageContainer = ({ children }) =>
  <Box
    margin="auto"
    paddingHorizontal={1}
    style={{
      maxWidth: 960,
      minHeight: '100vh', // make footer sticky
    }}
  >
    {children}
  </Box>;

// Flex 1 to make footer sticky.
const PageBody = ({ children }) =>
  <Box flex={1} maxWidth={30} paddingTop={2}>{children}</Box>;

const PageFooter = () =>
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
  </Text>;

type PageProps = {|
  children?: any,
  darkEnabled: boolean,
  title: string,
|};

const Page = ({ children, darkEnabled, title }: PageProps) => {
  const theme = darkEnabled ? browserThemeDark : browserTheme;
  const pageBackgroundColor = theme.colors[theme.page.backgroundColor];
  return (
    <ThemeProvider theme={theme}>
      <Baseline>
        <Head>
          <title>{title}</title>
          <meta name="theme-color" content={pageBackgroundColor} />
          <style
            dangerouslySetInnerHTML={{
              __html: `html { background-color: ${pageBackgroundColor} }`,
            }}
          />
        </Head>
        <LoadingBar />
        <PageContainer>
          <MainNav title={title} />
          <PageBody>{children}</PageBody>
          <PageFooter />
        </PageContainer>
      </Baseline>
    </ThemeProvider>
  );
};

export default connect((state: State) => ({
  darkEnabled: state.app.darkEnabled,
}))(Page);
