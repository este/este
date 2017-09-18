// @flow
import Image from '../components/Image';
import P from '../components/P';
import Page from '../components/Page';
import React from 'react';
import Set from '../components/Set';
import ToggleBaseline from '../components/ToggleBaseline';
import ToggleDark from '../components/ToggleDark';
import app from '../components/app';
import gravatar from 'gravatar';
import sitemap from '../lib/sitemap';
import type { meQueryResponse } from './__generated__/mePageQuery.graphql';
import { SignOutButton } from '../components/buttons';
import { graphql } from 'react-relay';
import CreateWeb from '../components/CreateWeb';
import Heading from '../components/Heading';
import { FormattedMessage } from 'react-intl';
import { deleteCookie } from '../lib/cookie';
import WebList from '../components/WebList';

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
  location.href = '/';
};

type Props = {
  data: meQueryResponse,
  intl: *,
};

const Me = ({ data, intl }: Props) => {
  const { user } = data.viewer;
  if (!user) return null;
  return (
    <Page title={intl.formatMessage(sitemap.me.title)}>
      <Heading size={1}>
        <FormattedMessage id="yourWebs" defaultMessage="Your Webs" />
      </Heading>
      <WebList viewer={data.viewer} />
      <CreateWeb viewer={data.viewer} />
      <Heading size={1}>
        <FormattedMessage id="profile" defaultMessage="Profile" />
      </Heading>
      <Image
        marginBottom={1}
        size={{ height: 100, width: 100 }}
        src={getGravatarUrl(user.email)}
        title={user.email}
      />
      <P bold>{user.email}</P>
      <Set>
        <SignOutButton danger onPress={signOut} />
      </Set>
      <Heading size={1}>
        <FormattedMessage defaultMessage="Dev Tools" id="devTools" />
      </Heading>
      <Set>
        <ToggleBaseline />
        <ToggleDark />
      </Set>
    </Page>
  );
};

export const createFilter = (userId: ?string) => ({
  filter: { owner: { id: userId } },
});

export default app(Me, {
  requireAuth: true,
  query: graphql`
    query mePageQuery($filter: WebFilter) {
      viewer {
        id
        user {
          id
          email
        }
        ...WebList_viewer
        ...CreateWeb_viewer
      }
    }
  `,
  queryVariables: (query, userId) => ({
    ...createFilter(userId),
  }),
});
