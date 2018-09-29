// @flow
import * as React from 'react';
import { View } from 'react-native';
import A from './core/A';
import { createFragmentContainer, graphql } from 'react-relay';
import type { MainNav as Data } from './__generated__/MainNav.graphql';
import { titles } from '../browser/sitemap';
import Spacer from './core/Spacer';
import { FormattedMessage } from 'react-intl';
import withTheme, { type Theme } from './core/withTheme';
import Gravatar from './core/Gravatar';

type MainNavProps = {|
  data: Data,
  theme: Theme,
|};

class MainNav extends React.PureComponent<MainNavProps> {
  render() {
    const {
      theme,
      data: { me, web, page },
    } = this.props;
    return (
      <View style={theme.styles.appPageMainNav}>
        <Spacer>
          <A href={{ pathname: '/' }} prefetch>
            <FormattedMessage {...titles.index} />
          </A>
          {web && (
            <A href={{ pathname: '/web', query: { id: web.id } }} prefetch>
              {web.draftName}
            </A>
          )}
          {page && (
            <A href={{ pathname: '/web', query: { id: page.web.id } }} prefetch>
              {page.web.name}
            </A>
          )}
          {page && (
            <A href={{ pathname: '/page', query: { id: page.id } }} prefetch>
              {page.draftTitle}
            </A>
          )}
          <View style={{ marginLeft: 'auto' }}>
            {me != null ? (
              <A href={{ pathname: '/me' }} prefetch>
                <Gravatar
                  email={me.email}
                  size={theme.typography.rhythm(1)}
                  inline
                  rounded
                />
              </A>
            ) : (
              <A href={{ pathname: '/sign-in' }} prefetch>
                <FormattedMessage {...titles.signIn} />
              </A>
            )}
          </View>
        </Spacer>
      </View>
    );
  }
}

export default createFragmentContainer(
  withTheme(MainNav),
  graphql`
    fragment MainNav on Query
      @argumentDefinitions(
        isPage: { type: "Boolean", defaultValue: false }
        isWeb: { type: "Boolean", defaultValue: false }
      ) {
      me {
        email
      }
      web(id: $id) @include(if: $isWeb) {
        id
        draftName
      }
      page(id: $id) @include(if: $isPage) {
        id
        draftTitle
        web {
          id
          name
        }
      }
    }
  `,
);
