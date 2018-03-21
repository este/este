// @flow
import * as React from 'react';
import A from './core/A';
import Box from './core/Box';
import { titles } from '../components/app/sitemap';
import { FormattedMessage } from 'react-intl';

// TODO: margin bottom 2 lineHeight

const MainNavA = ({ href, title }) =>
  null;
  // <A
  //   backgroundColor="primary"
  //   bold
  //   color="white"
  //   href={href}
  //   paddingHorizontal={0.5}
  //   paddingVertical={0.5}
  //   prefetch
  // >
  //   <FormattedMessage {...title} />
  // </A>

type MainNavProps = {|
  isAuthenticated: boolean,
|};

const MainNav = ({ isAuthenticated }: MainNavProps) => (
  <Box
    backgroundColor="primary"
    flexDirection="row"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    <MainNavA href={{ pathname: '/' }} title={titles.index} />
    {isAuthenticated ? (
      <MainNavA href={{ pathname: '/me' }} title={titles.me} />
    ) : (
      <MainNavA href={{ pathname: '/sign-in' }} title={titles.signIn} />
    )}
  </Box>
);

export default MainNav;
