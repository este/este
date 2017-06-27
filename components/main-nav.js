// @flow
import type { IntlShape } from 'react-intl';
import A from './a';
import Box from './box';
import sitemap from '../lib/sitemap';
import { FormattedMessage, injectIntl } from 'react-intl';

const NavA = ({ href, ...props }) =>
  <A
    backgroundColor="primary"
    bold
    color="white"
    href={href}
    paddingHorizontal={0.5}
    paddingVertical={0.5}
    prefetch
    {...props}
  />;

type MainNavProps = {
  intl: IntlShape,
  title: string,
};

const MainNav = ({ intl, title }: MainNavProps) =>
  <Box
    backgroundColor="primary"
    flexDirection="row"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    {Object.keys(sitemap).map(pageName => {
      const page = sitemap[pageName];
      const isActive = title === intl.formatMessage(page.title);
      return (
        <NavA href={page.path} isActive={isActive} key={pageName}>
          <FormattedMessage {...page.title} />
        </NavA>
      );
    })}
  </Box>;

export default injectIntl(MainNav);
