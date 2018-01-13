// @flow
import * as React from 'react';
import A from './A';
import Box from './Box';
import { titles } from '../lib/sitemap';
import { FormattedMessage } from 'react-intl';
import IsAuthenticated from './IsAuthenticated';

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

const MainNav = () => (
  <Box
    backgroundColor="primary"
    flexDirection="row"
    flexWrap="wrap"
    marginVertical={0.5}
    paddingHorizontal={0.5}
  >
    <MainNavA href={{ pathname: '/' }} title={titles.index} />
    <IsAuthenticated>
      {({ isAuthenticated }) =>
        isAuthenticated ? (
          <MainNavA href={{ pathname: '/me' }} title={titles.me} />
        ) : (
          <MainNavA href={{ pathname: '/sign-in' }} title={titles.signIn} />
        )
      }
    </IsAuthenticated>
  </Box>
);

export default MainNav;
