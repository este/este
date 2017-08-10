// @flow
import type { State, Viewer } from '../types';
import A from './A';
import AppError from './AppError';
import Baseline from './Baseline';
import Box from './Box';
import Head from 'next/head';
import LoadingBar from './LoadingBar';
import MainNav from './MainNav';
import Text from './Text';
import { FormattedMessage } from 'react-intl';
import { ThemeProvider } from 'react-fela';
import { browserTheme, browserThemeDark } from '../themes/browserTheme';
import { connect, type Connector } from 'react-redux';

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

// Because context is like dependency injection.
// https://facebook.github.io/react/docs/context.html#updating-context
const forceRenderOnThemeChange = theme => ({ key: JSON.stringify(theme) });

const Page = ({ children, darkEnabled, title, viewer }) => {
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
        <AppError />
        <PageContainer>
          <MainNav title={title} isAuthenticated={!!viewer} />
          <PageBody>
            {children}
          </PageBody>
          <PageFooter />
        </PageContainer>
      </Baseline>
    </ThemeProvider>
  );
};

type PageOwnProps = {|
  children?: ?any,
  title: string,
  viewer: Viewer,
|};

type PageProps = PageOwnProps & {|
  darkEnabled: boolean,
|};

const connector: Connector<
  PageOwnProps,
  PageProps,
> = connect((state: State) => ({
  darkEnabled: state.app.darkEnabled,
}));

export default connector(Page);
