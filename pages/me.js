// @flow
/* eslint-env browser */
import * as React from 'react';
import Block from '../components/core/Block';
import Text from '../components/core/Text';
import Row from '../components/core/Row';
import AppPage from '../components/AppPage';
import SetTheme from '../components/core/SetTheme';
import { titles } from '../browser/sitemap';
import { SignOutButton } from '../components/core/buttons';
import { graphql } from 'react-relay';
import { deleteCookie } from '../browser/cookie';
import Gravatar from '../components/core/Gravatar';
import type { PageWithQuery } from './_app';
import type { meQuery } from './__generated__/meQuery.graphql';

const signOut = () => {
  deleteCookie();
  // Force full reload.
  // Sensitive session data can be stored in NEXT_PROPS or elsewhere.
  window.location.href = '/';
};

const Me: PageWithQuery<meQuery> = props => {
  return (
    <AppPage
      requireAuth
      title={intl => intl.formatMessage(titles.me)}
      // $FlowFixMe https://github.com/facebook/relay/issues/2316
      data={props.data}
    >
      {props.data.me != null && (
        <>
          <Block>
            <Text bold>{props.data.me.email}</Text>
          </Block>
          <Block>
            <Gravatar email={props.data.me.email} />
          </Block>
        </>
      )}
      <Block>
        <Row>
          <SetTheme />
        </Row>
      </Block>
      <Block>
        <Row>
          <SignOutButton color="danger" onPress={signOut} />
        </Row>
      </Block>
    </AppPage>
  );
};

Me.getInitialProps = async context => {
  const data = await context.fetch(
    graphql`
      query meQuery {
        ...AppPage
        me {
          email
        }
      }
    `,
  );
  return { data };
};

export default Me;
