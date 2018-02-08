// @flow
import Image from '../components/Image';
import P from '../components/P';
import Page from '../components/Page';
import * as React from 'react';
import Set from '../components/Set';
import Button from '../components/Button';
import Baseline from '../components/Baseline';
import ToggleDark from '../components/ToggleDark';
import app from '../components/app';
import gravatar from 'gravatar';
import { titles } from '../server/sitemap';
import type { meQueryResponse } from './__generated__/meQuery.graphql';
import { SignOutButton } from '../components/buttons';
import { graphql } from 'react-relay';
import Heading from '../components/Heading';
import { FormattedMessage } from 'react-intl';
import { deleteCookie } from '../components/app/cookie';
import Box from '../components/Box';

const getGravatarUrl = email =>
  gravatar.url(email, {
    d: 'retro',
    protocol: 'https',
    r: 'x',
    s: '100',
  });

const signOut = () => {
  deleteCookie();
  // Force full reload. Purging Relay environment and Redux store is not enough.
  // Sensitive session data can be stored in NEXT_PROPS or elsewhere.
  // eslint-disable-next-line no-undef
  window.location.href = '/';
};

const Me = ({ data, intl }) => {
  const { me }: meQueryResponse = data;
  const email = me && me.email;
  return (
    <Page title={intl.formatMessage(titles.me)}>
      {email != null && (
        <Box>
          <Image
            marginBottom={1}
            size={{ height: 100, width: 100 }}
            src={getGravatarUrl(email)}
            title={email}
          />
          <P bold>{email}</P>
        </Box>
      )}
      <Set>
        <SignOutButton danger onPress={signOut} />
      </Set>
      <Heading size={1}>
        <FormattedMessage defaultMessage="Dev Tools" id="devTools" />
      </Heading>
      <Set>
        <Baseline>
          {({ toggle, shown }) => (
            <Button primary outline size={-1} onPress={toggle}>
              {shown ? 'Hide Baseline' : 'Show Baseline'}
            </Button>
          )}
        </Baseline>
        <ToggleDark />
      </Set>
    </Page>
  );
};

export default app(Me, {
  requireAuth: true,
  query: graphql`
    # query name is enforced via Relay compiler.
    query meQuery {
      me {
        email
      }
    }
  `,
});
