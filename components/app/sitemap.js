// @flow
/* eslint-disable import/prefer-default-export */

import { defineMessages } from 'react-intl';

// With Href type, we can ensure all app links are correct at build time.
export type Href =
  | {|
      pathname: '/',
    |}
  | {|
      pathname: '/sign-in',
      query?: {| redirectUrl: string |},
    |}
  | {|
      pathname: '/me',
    |}
  | {|
      pathname: '/editor',
      query: {| id: string |},
    |}
  | {|
      pathname: '/web',
      query: {| id: string |},
    |};

// Must be separated from pages because pages are lazily loaded and MainNav
// would require all pages just because of their titles.
export const titles = defineMessages({
  index: {
    defaultMessage: 'Este',
    id: 'sitemap.title.index',
  },
  signIn: {
    defaultMessage: 'Sign In',
    id: 'sitemap.title.signIn',
  },
  me: {
    defaultMessage: 'Me',
    id: 'sitemap.title.me',
  },
});
