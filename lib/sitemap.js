// @flow
import { defineMessages } from 'react-intl';

// Must be separated from pages itself because pages are lazy loaded and MainNav
// would require all pages just because of their titles.
export const titles = defineMessages({
  index: { defaultMessage: 'Home', id: 'sitemap.title.index' },
  signIn: { defaultMessage: 'Sign In', id: 'sitemap.title.signIn' },
  me: { defaultMessage: 'Me', id: 'sitemap.title.me' },
  edit: { defaultMessage: 'Edit', id: 'sitemap.title.edit' },
});

// With Href type, we can ensure all app links are correct at build time.
// Of course, it can't work with pretty URLs based on regular expressions
// without Idris-like type checking.
// Therefore, pretty URLs must be defined ad-hoc.

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
      pathname: '/edit',
      query: {| webDomain: string |},
    |};
