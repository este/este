// @flow
import * as React from 'react';
import P from '../components/core/P';
import Page from '../components/core/Page';
import { ToggleTheme } from '../components/core/Theme';
import app from '../components/app';
import gravatar from 'gravatar';
import { titles } from '../components/app/sitemap';
import { SignOutButton } from '../components/core/buttons';
import { graphql } from 'react-relay';
import { deleteCookie } from '../components/app/cookie';
import * as generated from './__generated__/meQuery.graphql';
import { Image } from 'react-native';
import Row from '../components/core/Row';

const getGravatarUrl = email =>
  gravatar.url(email, {
    d: 'retro',
    protocol: 'https',
    r: 'x',
    s: '100',
  });

const signOut = () => {
  deleteCookie();
  // Force full reload.
  // Sensitive session data can be stored in NEXT_PROPS or elsewhere.
  // eslint-disable-next-line no-undef
  window.location.href = '/';
};

const Me = props => {
  const { me }: generated.meQueryResponse = props.data;
  return (
    <Page
      requireAuth
      title={intl => intl.formatMessage(titles.me)}
      data={props.data}
    >
      {me != null && (
        <React.Fragment>
          <P>
            <Image
              source={getGravatarUrl(me.email)}
              style={{
                height: 100,
                width: 100,
              }}
              title={me.email}
            />
          </P>

          <P bold>{me.email}</P>
        </React.Fragment>
      )}
      <Row>
        <SignOutButton color="danger" onPress={signOut} />
        <ToggleTheme />
      </Row>
    </Page>
  );
};

export default app(Me, {
  query: graphql`
    query meQuery {
      ...Page
      me {
        email
      }
    }
  `,
});
