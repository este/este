// @flow
import AuthForm from '../components/auth-form';
import Page from '../components/page';
import app from '../components/app';
import sitemap from '../lib/sitemap';

const SignIn = ({ intl }) =>
  <Page title={intl.formatMessage(sitemap.signIn.title)}>
    <AuthForm />
  </Page>;

export default app(SignIn);
