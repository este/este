// @flow
import Heading from '../components/heading';
import P from '../components/p';
import Page from '../components/page';
import SwitchLocale from '../components/switch-locale';
import app from '../components/app';
import sitemap from '../lib/sitemap';
import { FormattedDate, FormattedNumber, FormattedRelative } from 'react-intl';

const Forms = ({ intl, url: { pathname } }) => {
  const now = Date.now();
  return (
    <Page title={intl.formatMessage(sitemap.i18n.title)}>
      <Heading size={3}>
        {intl.formatMessage(sitemap.i18n.title)}
      </Heading>
      <SwitchLocale pathname={pathname} />
      <P>
        <FormattedNumber value={1024} />
      </P>
      <P>
        <FormattedDate day="numeric" month="long" value={now} year="numeric" />
      </P>
      <P>
        <FormattedRelative
          initialNow={now}
          updateInterval={1000 * 1}
          value={now}
        />
      </P>
    </Page>
  );
};

export default app(Forms);
