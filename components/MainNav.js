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

type MainNavProps = {|
  isAuthenticated: boolean,
  theme: Theme,
|};

class MainNav extends React.PureComponent<MainNavProps> {
  static Spacer = ({ theme }) => <View style={theme.styles.mainNavSpacer} />;

  render() {
    const { theme, isAuthenticated } = this.props;
    return (
      <View style={[styles.view, theme.styles.mainNav]}>
        <A href={{ pathname: '/' }} prefetch>
          <FormattedMessage {...titles.index} />
        </A>
        <MainNav.Spacer theme={theme} />
        {isAuthenticated ? (
          <A href={{ pathname: '/me' }} prefetch>
            <FormattedMessage {...titles.me} />
          </A>
        ) : (
          <A href={{ pathname: '/sign-in' }} prefetch>
            <FormattedMessage {...titles.signIn} />
          </A>
        )}
      </View>
    );
  }
}

export default withTheme(MainNav);
