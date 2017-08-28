// @flow
import A from './A';
import Box from './Box';
import React, { type ComponentType } from 'react';
import sitemap from '../lib/sitemap';
import type { IntlShape } from 'react-intl';
import { FormattedMessage, injectIntl } from 'react-intl';
import withIsAuthenticated, {
  type IsAuthenticatedContext,
} from './withIsAuthenticated';

const NavA = ({ intl, page, title, ...props }) => (
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
  </A>
);

type MainNavOwnProps = {
  title: string,
};

type MainNavProps = MainNavOwnProps & {
  intl: IntlShape,
};

const MainNav = (
  { intl, title }: MainNavProps,
  { isAuthenticated }: IsAuthenticatedContext,
) => {
  const { index, me, signIn } = sitemap;
  const auth = isAuthenticated ? me : signIn;
  return (
    <Box
      backgroundColor="primary"
      flexDirection="row"
      flexWrap="wrap"
      marginVertical={0.5}
      paddingHorizontal={0.5}
    >
      <NavA intl={intl} key={index.path} page={index} title={title} />
      <NavA intl={intl} key={auth.path} page={auth} title={title} />
    </Box>
  );
};

withIsAuthenticated(MainNav);

const MainNavIntl: ComponentType<MainNavOwnProps> = injectIntl(MainNav);

export default MainNavIntl;
