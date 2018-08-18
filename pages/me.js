// @flow
/* eslint-env browser */
import * as React from 'react';
import Block from '../components/core/Block';
import Text from '../components/core/Text';
import Row from '../components/core/Row';
import AppPage from '../components/app/AppPage';
import SetTheme from '../components/core/SetTheme';
import app from '../components/app/app';
import { titles } from '../components/app/sitemap';
import { SignOutButton } from '../components/core/buttons';
import { graphql } from 'react-relay';
import { deleteCookie } from '../components/app/cookie';
import * as generated from './__generated__/meQuery.graphql';
import Gravatar from '../components/core/Gravatar';

const signOut = () => {
  deleteCookie();
  // Force full reload.
  // Sensitive session data can be stored in NEXT_PROPS or elsewhere.
  window.location.href = '/';
};

const Me = props => {
  const { me }: generated.meQueryResponse = props.data;
  return (
    <AppPage
      requireAuth
      title={intl => intl.formatMessage(titles.me)}
      data={props.data}
    >
      {me != null && (
        <>
          <Block>
            <Text bold>{me.email}</Text>
          </Block>
          <Block>
            <Gravatar email={me.email} />
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

export default app(Me, {
  query: graphql`
    query meQuery {
      ...AppPage
      me {
        email
      }
    }
  `,
});
