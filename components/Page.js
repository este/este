// @flow
import A from './A';
import AppError from './AppError';
import Box from './Box';
import Head from 'next/head';
import LoadingBar from './LoadingBar';
import MainNav from './MainNav';
import * as React from 'react';
import SwitchLocale from './SwitchLocale';
import Text from './Text';
import { FormattedMessage } from 'react-intl';
import { ThemeProvider } from './Theme';
import { browserTheme, browserThemeDark } from '../themes/browserTheme';
import PageStyle from './PageStyle';
import MetaViewport from './MetaViewport';

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

type PageProps = {|
  title: string,
  children?: React.Node,
|};

const Page = ({ title, children }: PageProps) => {
  // TODO: Persist in user settings.
  const darkEnabled = true;
  const theme = darkEnabled ? browserThemeDark : browserTheme;
  const pageBackgroundColor = theme.colors[theme.page.backgroundColor];
  return (
    <ThemeProvider value={theme}>
      <Head>
        <title>{title}</title>
        <MetaViewport />
        <Favicons />
      </Head>
      <PageStyle backgroundColor={pageBackgroundColor} />
      <LoadingBar color={theme.colors.primary} />
      <AppError />
      <Container>
        <MainNav />
        <Body>{children}</Body>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Page;
