// @flow
import AuthForm from '../components/auth-form';
import Heading from '../components/heading';
import Page from '../components/page';
import app from '../components/app';
import sitemap from '../lib/sitemap';

const Forms = ({ intl }) =>
  <Page title={intl.formatMessage(sitemap.signIn.title)}>
    <Heading size={3}>
      {intl.formatMessage(sitemap.signIn.title)}
    </Heading>
    <AuthForm />
  </Page>;

export default app(Forms);
