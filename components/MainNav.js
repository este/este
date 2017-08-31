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

type OwnProps = {
  title: string,
};

type Props = OwnProps & {
  intl: IntlShape,
};

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

const MainNav = (
  { intl, title }: Props,
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

const MainNavIntl: ComponentType<OwnProps> = injectIntl(MainNav);

export default MainNavIntl;
