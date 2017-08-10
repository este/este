// @flow
import type { FunctionalComponent } from '../types';
import type { IntlShape } from 'react-intl';
import A from './A';
import Box from './Box';
import sitemap from '../lib/sitemap';
import { FormattedMessage, injectIntl } from 'react-intl';

const { me, signIn, ...pages } = sitemap;

const NavA = ({ intl, page, title, ...props }) =>
  <A
    backgroundColor="primary"
    bold
    isActive={title === intl.formatMessage(page.title)}
    color="white"
    href={page.path}
    paddingHorizontal={0.5}
    paddingVertical={0.5}
    prefetch
    {...props}
  >
    <FormattedMessage {...page.title} />
  </A>;

type MainNavProps = {|
  intl: IntlShape,
  isAuthenticated: boolean,
  title: string,
|};

const MainNav = ({ intl, title, isAuthenticated }: MainNavProps) => {
  const authPage = isAuthenticated ? me : signIn;
  return (
    <Box
      backgroundColor="primary"
      flexDirection="row"
      flexWrap="wrap"
      marginVertical={0.5}
      paddingHorizontal={0.5}
    >
      {Object.keys(pages).map(pageName => {
        const page = pages[pageName];
        return <NavA intl={intl} key={page.path} page={page} title={title} />;
      })}
      <NavA intl={intl} key={authPage.path} page={authPage} title={title} />
    </Box>
  );
};

// Should be handled by injectIntl type.
export default (injectIntl(MainNav): FunctionalComponent<{|
  isAuthenticated: boolean,
  title: string,
|}>);
