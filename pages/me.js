// @flow
import Page from '../components/Page';
import Set from '../components/Set';
import app from '../components/app';
import cookie from 'cookie';
import sitemap from '../lib/sitemap';
import { SignOutButton } from '../components/buttons';

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

const Me = ({ intl, viewer }) =>
  <Page title={intl.formatMessage(sitemap.me.title)} viewer={viewer}>
    <Set>
      <SignOutButton danger onPress={signOut} />
    </Set>
  </Page>;

export default app(Me, { requireAuth: true });
