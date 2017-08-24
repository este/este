// @flow
import A from './A';
import Box from './Box';
import PropTypes from 'prop-types';
import React from 'react';
import sitemap from '../lib/sitemap';
import type { IntlShape } from 'react-intl';
import { FormattedMessage, injectIntl } from 'react-intl';

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
  title: string,
|};

const MainNav = ({ intl, title }: MainNavProps, { isAuthenticated }) => {
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

MainNav.contextTypes = { isAuthenticated: PropTypes.bool };

export default injectIntl(MainNav);
