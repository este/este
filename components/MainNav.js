// @flow
import * as React from 'react';
import A from './core/A';
import { titles } from '../components/app/sitemap';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import Theme from './core/Theme';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const MainNavA = ({ href, title }) => (
  <Theme>
    {theme => (
      <A
        bold
        color="white"
        href={href}
        fixWebFontSmoothing
        prefetch
        style={theme.styles.mainNav.a}
      >
        <FormattedMessage {...title} />
      </A>
    )}
  </Theme>
);

type MainNavProps = {|
  isAuthenticated: boolean,
|};

const MainNav = ({ isAuthenticated }: MainNavProps) => (
  <Theme>
    {theme => (
      <View style={[styles.view, theme.styles.mainNav.view]}>
        <MainNavA href={{ pathname: '/' }} title={titles.index} />
        {isAuthenticated ? (
          <MainNavA href={{ pathname: '/me' }} title={titles.me} />
        ) : (
          <MainNavA href={{ pathname: '/sign-in' }} title={titles.signIn} />
        )}
      </View>
    )}
  </Theme>
);

export default MainNav;
