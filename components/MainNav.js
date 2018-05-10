// @flow
import * as React from 'react';
import A from './core/A';
import { titles } from '../components/app/sitemap';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import ThemeContext from './core/ThemeContext';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const MainNavA = ({ href, title }) => (
  <ThemeContext.Consumer>
    {theme => (
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
    )}
  </ThemeContext.Consumer>
);

type MainNavProps = {|
  isAuthenticated: boolean,
|};

const MainNav = ({ isAuthenticated }: MainNavProps) => (
  <ThemeContext.Consumer>
    {theme => (
      <View style={[styles.view, theme.styles.mainNav]}>
        <MainNavA href={{ pathname: '/' }} title={titles.index} />
        {isAuthenticated ? (
          <MainNavA href={{ pathname: '/me' }} title={titles.me} />
        ) : (
          <MainNavA href={{ pathname: '/sign-in' }} title={titles.signIn} />
        )}
      </View>
    )}
  </ThemeContext.Consumer>
);

export default MainNav;
