// @flow
import A from './A';
import AppError from './AppError';
import Baseline from './Baseline';
import Box from './Box';
import Head from 'next/head';
import LoadingBar from './LoadingBar';
import MainNav from './MainNav';
import * as React from 'react';
import SwitchLocale from '../components/SwitchLocale';
import Text from './Text';
import type { State } from '../types';
import { FormattedMessage } from 'react-intl';
import ThemeProvider from './ThemeProvider';
import { browserTheme, browserThemeDark } from '../themes/browserTheme';
import { connect, type Connector, type MapStateToProps } from 'react-redux';
import PageStyle from './PageStyle';

// yarn favicon
const Favicons = () => [
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/static/favicons/apple-touch-icon.png"
  />,
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="/static/favicons/favicon-32x32.png"
  />,
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="/static/favicons/favicon-16x16.png"
  />,
  <link rel="manifest" href="/static/favicons/manifest.json" />,
  <link
    rel="mask-icon"
    href="/static/favicons/safari-pinned-tab.svg"
    color="#5bbad5"
  />,
  <link rel="shortcut icon" href="/static/favicons/favicon.ico" />,
  <meta
    name="msapplication-config"
    content="/static/favicons/browserconfig.xml"
  />,
];

const Container = ({ children }) => (
  <Box
    margin="auto"
    paddingHorizontal={1}
    style={{
      maxWidth: 960,
      minHeight: '100vh', // make footer sticky
    }}
  >
    {children}
  </Box>
);

// Flex 1 to make footer sticky.
const Body = ({ children }) => (
  <Box flex={1} maxWidth={30} paddingTop={2}>
    {children}
  </Box>
);

const Footer = () => (
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
    <A href="https://twitter.com/steida">steida</A>
    {', '}
    <SwitchLocale />
  </Text>
);

const Page = ({ children, darkEnabled, title, isAuthenticated }) => {
  const theme = darkEnabled ? browserThemeDark : browserTheme;
  const pageBackgroundColor = theme.colors[theme.page.backgroundColor];
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          // https://bitsofco.de/ios-safari-and-shrink-to-fit
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <Favicons />
      </Head>
      <PageStyle backgroundColor={pageBackgroundColor} />
      <Baseline>
        <LoadingBar color={theme.colors.primary} />
        <AppError />
        <Container>
          <MainNav isAuthenticated={isAuthenticated} />
          <Body>{children}</Body>
          <Footer />
        </Container>
      </Baseline>
    </ThemeProvider>
  );
};

type OwnProps = {|
  children?: React.Node,
  isAuthenticated: boolean,
  title: string,
|};

const mapStateToProps: MapStateToProps<*, *, *> = (state: State) => ({
  darkEnabled: state.app.darkEnabled,
});

const connector: Connector<OwnProps, *> = connect(mapStateToProps);

export default connector(Page);
