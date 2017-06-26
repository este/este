// @flow
import Heading from '../components/heading';
import Page from '../components/page';
import SwitchLocale from '../components/switch-locale';
import app from '../components/app';
import sitemap from '../lib/sitemap';

const Forms = ({ intl, url: { pathname } }) =>
  <Page title={intl.formatMessage(sitemap.i18n.title)}>
    <Heading size={3}>{intl.formatMessage(sitemap.i18n.title)}</Heading>
    <SwitchLocale pathname={pathname} />

  </Page>;

export default app(Forms);
