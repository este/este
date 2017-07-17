// @flow
import type { State } from '../types';
import A from '../components/A';
import Baseline from '../components/Baseline';
import Box from './Box';
import Head from 'next/head';
import LoadingBar from '../components/LoadingBar';
import MainNav from '../components/MainNav';
import Text from '../components/Text';
import { FormattedMessage } from 'react-intl';
import { ThemeProvider } from 'react-fela';
import { browserTheme, browserThemeDark } from '../themes/browserTheme';
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
  <Box flex={1} maxWidth={30} paddingTop={2}>
    {children}
  </Box>;

const PageFooter = () =>
  <Text
    borderColor="gray"
    borderStyle="solid"
    borderTopWidth={1}
    flexDirection="row"
    marginTop={2}
    paddingVertical={1}
    size={-1}
  >
    <FormattedMessage defaultMessage="made by" id="footer.madeBy" />{' '}
    <A size={-1} href="https://twitter.com/steida">
      steida
    </A>
  </Text>;

type PageProps = {|
  children?: any,
  darkEnabled: boolean,
  title: string,
|};

// Because context is like dependency injection.
// https://facebook.github.io/react/docs/context.html#updating-context
const forceRenderOnThemeChange = theme => ({ key: JSON.stringify(theme) });

const Page = ({ children, darkEnabled, title }: PageProps) => {
  const theme = darkEnabled ? browserThemeDark : browserTheme;
  const pageBackgroundColor = theme.colors[theme.page.backgroundColor];
  return (
    <ThemeProvider theme={theme} {...forceRenderOnThemeChange(theme)}>
      <Baseline>
        <Head>
          <title>
            {title}
          </title>
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
          <PageBody>
            {children}
          </PageBody>
          <PageFooter />
        </PageContainer>
      </Baseline>
    </ThemeProvider>
  );
};

export default connect((state: State) => ({
  darkEnabled: state.app.darkEnabled,
}))(Page);
