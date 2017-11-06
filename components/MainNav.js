// @flow
import * as React from 'react';
import A from './A';
import Box from './Box';
import sitemap from '../lib/sitemap';
import { FormattedMessage } from 'react-intl';

type MainNavProps = {|
  isAuthenticated: boolean,
|};

const MainNavA = ({ href, title }) => (
  <A
    backgroundColor="primary"
    bold
    color="white"
    href={href}
    paddingHorizontal={0.5}
    paddingVertical={0.5}
    prefetch
  >
    <FormattedMessage {...title} />
  </A>
);

const MainNav = ({ isAuthenticated }: MainNavProps) => (
  <Box
    backgroundColor="primary"
    flexDirection="row"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    <MainNavA href={{ pathname: '/' }} title={sitemap.titles.index} />
    {isAuthenticated ? (
      <MainNavA href={{ pathname: '/me' }} title={sitemap.titles.me} />
    ) : (
      <MainNavA href={{ pathname: '/sign-in' }} title={sitemap.titles.signIn} />
    )}
  </Box>
);

export default MainNav;
