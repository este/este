// @flow
import { View, StyleSheet, ScrollView } from 'react-native';
import A from './A';
import ErrorPopup from './ErrorPopup';
import Head from 'next/head';
import PageLoadingBar from './PageLoadingBar';
import MainNav from '../MainNav';
import * as React from 'react';
import SwitchLocale from './SwitchLocale';
import { FormattedMessage, type IntlShape } from 'react-intl';
import Theme, { ThemeProvider } from './Theme';
import { lightTheme, darkTheme } from '../../themes/theme';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Page.graphql';
import Auth from './Auth';
import withIntl from './withIntl';
import Text from './Text';

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

const styles = StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  container: {
    flex: 1,
    margin: 'auto',
  },
  body: {
    flex: 1, // make footer sticky
  },
  footer: {
    flexDirection: 'row',
  },
});

const PageContainer = ({ children }) => (
  <Theme>
    {theme => (
      // Why ScrollView https://github.com/necolas/react-native-web/issues/829
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.container, theme.styles.page.container]}
      >
        {children}
      </ScrollView>
    )}
  </Theme>
);

const PageBody = ({ children }) => (
  <Theme>
    {theme => (
      <View style={[styles.body, theme.styles.page.body]}>{children}</View>
    )}
  </Theme>
);

const PageFooter = () => (
  <Theme>
    {theme => (
      <View style={[styles.footer, theme.styles.page.footer]}>
        <Text size={-1}>
          <FormattedMessage defaultMessage="made by" id="footer.madeBy" />{' '}
          <A href="https://twitter.com/steida">steida</A>
          {', '}
          <SwitchLocale />
        </Text>
      </View>
    )}
  </Theme>
);

type Props = {|
  // Prop as function pattern.
  title: string | ((intl: IntlShape) => string),
  children: React.Node | ((isAuthenticated: boolean) => React.Node),
  data: generated.Page,
  requireAuth?: boolean,
  intl: IntlShape,
|};

class Page extends React.PureComponent<Props> {
  static getTheme = themeName => {
    switch (themeName) {
      case 'light':
        return lightTheme;
      case 'dark':
        return darkTheme;
      default:
        return lightTheme;
    }
  };

  renderChildrenOrAuth(isAuthenticated) {
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
    const pageBackgroundColor = theme.colors[theme.pageBackgroundColor];

    return (
      <ThemeProvider value={theme}>
        <Head>
          <title>
            {typeof this.props.title === 'function'
              ? this.props.title(this.props.intl)
              : this.props.title}
          </title>
          <meta name="theme-color" content={pageBackgroundColor} />
          <style>{` html { background-color: ${pageBackgroundColor} } `}</style>
          <Favicons />
        </Head>
        <PageLoadingBar color={theme.colors.primary} />
        <ErrorPopup />
        <PageContainer>
          <MainNav isAuthenticated={isAuthenticated} />
          <PageBody>{this.renderChildrenOrAuth(isAuthenticated)}</PageBody>
          <PageFooter />
        </PageContainer>
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
