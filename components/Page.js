// @flow
import A from './A';
import ErrorPopup from './ErrorPopup';
import Box from './Box';
import Head from 'next/head';
import LoadingBar from './LoadingBar';
import MainNav from './MainNav';
import * as React from 'react';
import SwitchLocale from './SwitchLocale';
import Text from './Text';
import { FormattedMessage, type IntlShape } from 'react-intl';
import { ThemeProvider } from './Theme';
import { browserTheme, browserThemeDark } from '../themes/browserTheme';
import PageStyle from './PageStyle';
import MetaViewport from './MetaViewport';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Page.graphql';
import Auth from '../components/Auth';
import withIntl from './withIntl';

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
  title: string | ((intl: IntlShape) => string),
  children: React.Node | ((isAuthenticated: boolean) => React.Node),
  data: generated.Page,
  requireAuth?: boolean,
  intl: IntlShape,
|};

class Page extends React.PureComponent<PageProps> {
  static getTheme = themeName => {
    switch (themeName) {
      case 'light':
        return browserTheme;
      case 'dark':
        return browserThemeDark;
      default:
        return browserTheme;
    }
  };

  renderChildren(isAuthenticated) {
    const authRequired = this.props.requireAuth === true && !isAuthenticated;
    if (!authRequired)
      return typeof this.props.children === 'function'
        ? this.props.children(isAuthenticated)
        : this.props.children;
    return <Auth />;
  }

  render() {
    const { me } = this.props.data;
    const isAuthenticated = me != null;
    const themeName =
      // That's how we gradually check nullable types.
      (me != null && me.themeName != null && me.themeName) || 'light';
    const theme = Page.getTheme(themeName);
    const pageBackgroundColor = theme.colors[theme.page.backgroundColor];

    return (
      <ThemeProvider value={theme}>
        <Head>
          <title>
            {typeof this.props.title === 'function'
              ? this.props.title(this.props.intl)
              : this.props.title}
          </title>
          <MetaViewport />
          <Favicons />
        </Head>
        <PageStyle backgroundColor={pageBackgroundColor} />
        <LoadingBar color={theme.colors.primary} />
        <ErrorPopup />
        <Container>
          <MainNav isAuthenticated={isAuthenticated} />
          <Body>{this.renderChildren(isAuthenticated)}</Body>
          <Footer />
        </Container>
      </ThemeProvider>
    );
  }
}

const PageWithIntl = withIntl(Page);

// https://github.com/este/este/issues/1484
export default createFragmentContainer(
  PageWithIntl,
  graphql`
    fragment Page on Query {
      me {
        id
        themeName
      }
    }
  `,
);
