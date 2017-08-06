// @flow
import type { meQueryResponse } from './__generated__/meQuery.graphql';
import Page from '../components/Page';
import P from '../components/P';
import Set from '../components/Set';
import app from '../components/app';
import cookie from 'cookie';
import sitemap from '../lib/sitemap';
import { SignOutButton } from '../components/buttons';
import { graphql } from 'react-relay';

const signOut = () => {
  // eslint-disable-next-line no-undef
  document.cookie = cookie.serialize('token', '', {
    // Expire the cookie immediately.
    maxAge: -1,
  });
  // Force full reload. Purging Relay environment and Redux store is not enough.
  // Sensitive session data can be stored in NEXT_PROPS or elsewhere.
  // eslint-disable-next-line no-undef
  location.href = '/';
};

const Me = ({ data, intl, viewer }) => {
  // Force type via any cast.
  const { viewer: { user } } = ((data: any): meQueryResponse);
  return (
    <Page title={intl.formatMessage(sitemap.me.title)} viewer={viewer}>
      <P>
        {user && user.email}
      </P>
      <Set>
        {/* {data.viewer.user && data.viewer.user.email} */}
        <SignOutButton danger onPress={signOut} />
      </Set>
    </Page>
  );
};

export default app(Me, {
  requireAuth: true,
  fetch: graphql`
    query meQuery {
      viewer {
        user {
          email
        }
      }
    }
  `,
});
