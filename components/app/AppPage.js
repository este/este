// @flow
import * as React from 'react';
import { View } from 'react-native';
import A from '../core/A';
import ErrorPopup from '../core/ErrorPopup';
import Head from 'next/head';
import PageLoadingBar from '../core/PageLoadingBar';
import SwitchLocale from '../core/SwitchLocale';
import { injectIntl, FormattedMessage, type IntlShape } from 'react-intl';
import ThemeContext from '../core/ThemeContext';
import { lightTheme, darkTheme } from '../../themes/theme';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/AppPage.graphql';
import Auth from '../core/Auth';
import Text from '../core/Text';
import MainNav from '../MainNav';

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

const PageFooter = ({ theme }) => (
  <View style={theme.styles.appPageFooter}>
    <Text size={-1}>
      <FormattedMessage defaultMessage="made by" id="footer.madeBy" />{' '}
      <A href="https://twitter.com/steida">steida</A>
      {', '}
      <SwitchLocale />
    </Text>
  </View>
);

type Props = {|
  title?: string | ((intl: IntlShape) => string),
  children?: React.Node | ((isAuthenticated: boolean) => React.Node),
  data: generated.AppPage,
  requireAuth?: boolean,
  intl: IntlShape,
  isEditor?: boolean,
|};

class AppPage extends React.PureComponent<Props> {
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

  static fixedPositionStyle = { position: 'fixed' };

  renderChildrenOrAuth(isAuthenticated) {
    const authRequired = this.props.requireAuth === true && !isAuthenticated;
    if (authRequired) return <Auth />;
    return typeof this.props.children === 'function'
      ? this.props.children(isAuthenticated)
      : this.props.children;
  }

  render() {
    const { data, isEditor = false, title, intl } = this.props;
    const { me } = data;
    const themeName =
      // That's how we gradually check nullable types.
      // TODO: Use Optional Chaining.
      (me != null && me.themeName != null && me.themeName) || 'light';
    const theme = AppPage.getTheme(themeName);
    const pageBackgroundColor = theme.colors[theme.pageBackgroundColor];
    const isAuthenticated = me != null;

    return (
      <ThemeContext.Provider value={theme}>
        <Head>
          {title != null && (
            <title>{typeof title === 'function' ? title(intl) : title}</title>
          )}
          <meta name="theme-color" content={pageBackgroundColor} />
          <style>{` html { background-color: ${pageBackgroundColor} } `}</style>
          <Favicons />
        </Head>
        {/*
          TODO: Use ScrollView https://github.com/este/este/issues/1584
          Meanwhile, we have to use position fixed.
        */}
        <View
          style={[theme.styles.appPageFixedHeader, AppPage.fixedPositionStyle]}
        >
          <PageLoadingBar color={theme.colors.primary} />
          <ErrorPopup />
        </View>
        <View style={theme.styles.appPageContainer}>
          <View style={theme.styles.appPageContainerChild}>
            {/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
            <MainNav data={data} />
          </View>
          <View
            style={[
              !isEditor && theme.styles.appPageContainerChild,
              theme.styles.appPageBody,
            ]}
          >
            {this.renderChildrenOrAuth(isAuthenticated)}
          </View>
          {isEditor !== true && (
            <View style={theme.styles.appPageContainerChild}>
              <PageFooter theme={theme} />
            </View>
          )}
        </View>
      </ThemeContext.Provider>
    );
  }
}

export default createFragmentContainer(
  injectIntl(AppPage),
  graphql`
    fragment AppPage on Query
      @argumentDefinitions(
        isPage: { type: "Boolean", defaultValue: false }
        isWeb: { type: "Boolean", defaultValue: false }
      ) {
      me {
        themeName
      }
      ...MainNav @arguments(isPage: $isPage, isWeb: $isWeb)
    }
  `,
);
