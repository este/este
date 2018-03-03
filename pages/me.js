// @flow
import * as React from 'react';
import Image from '../components/Image';
import P from '../components/P';
import Page from '../components/Page';
import Set from '../components/Set';
import { ToggleTheme } from '../components/Theme';
import app from '../components/app';
import gravatar from 'gravatar';
import { titles } from '../server/sitemap';
import { SignOutButton } from '../components/buttons';
import { graphql } from 'react-relay';
import Heading from '../components/Heading';
import { FormattedMessage } from 'react-intl';
import { deleteCookie } from '../components/app/cookie';
import Box from '../components/Box';
import * as generated from './__generated__/meQuery.graphql';

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
        <Box>
          <Image
            marginBottom={1}
            size={{ height: 100, width: 100 }}
            src={getGravatarUrl(me.email)}
            title={me.email}
          />
          <P bold>{me.email}</P>
        </Box>
      )}
      <Set>
        <SignOutButton danger onPress={signOut} />
      </Set>
      <Heading size={1}>
        <FormattedMessage defaultMessage="Dev Tools" id="devTools" />
      </Heading>
      <Set>
        <ToggleTheme />
      </Set>
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
