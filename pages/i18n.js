// @flow
import Heading from '../components/heading';
import Page from '../components/page';
import SwitchLocale from '../components/switch-locale';
import app from '../components/app';

type FormsProps = {
  // This should be typed by Next.js
  url: { pathname: string },
};

const Forms = ({ url: { pathname } }: FormsProps) =>
  <Page title="i18n">
    <Heading size={3}>i18n</Heading>
    <SwitchLocale pathname={pathname} />

  </Page>;

export default app(Forms);
