// @flow
import * as React from 'react';
import A from './core/A';
import { titles } from '../components/app/sitemap';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const MainNavA = ({ href, title, theme }) => (
  <A
    bold
    color="white"
    href={href}
    fixWebFontSmoothing
    prefetch
    style={theme.styles.mainNavA}
  >
    <FormattedMessage {...title} />
  </A>
);

type MainNavProps = {|
  isAuthenticated: boolean,
  theme: Theme,
|};

class MainNav extends React.PureComponent<MainNavProps> {
  render() {
    const { theme, isAuthenticated } = this.props;
    return (
      <View style={[styles.view, theme.styles.mainNav]}>
        <MainNavA href={{ pathname: '/' }} title={titles.index} theme={theme} />
        {isAuthenticated ? (
          <MainNavA
            href={{ pathname: '/me' }}
            title={titles.me}
            theme={theme}
          />
        ) : (
          <MainNavA
            href={{ pathname: '/sign-in' }}
            title={titles.signIn}
            theme={theme}
          />
        )}
      </View>
    );
  }
}

export default withTheme(MainNav);
