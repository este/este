// @flow
import AuthForm from '../components/AuthForm';
import Page from '../components/Page';
import app from '../components/app';
import sitemap from '../lib/sitemap';

const SignIn = ({ intl, viewer }) =>
  <Page title={intl.formatMessage(sitemap.signIn.title)} viewer={viewer}>
    <AuthForm />
  </Page>;

export default app(SignIn);
