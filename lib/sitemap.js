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

// Pretty URLs? I think they are overrated for almost all use cases.
// Nobody cares whether we have /edit?webDomain=foo or /edit/foo.
// But there are exceptions like este.io/my-new-web or este.io/posts/hi-123.
// For such use cases, check Next.js examples/parameterized-routing example.
//  1) Manually match pathname and redirect it to page with query in server.js.
//  2) Create a helper function for pretty URL.
// Reverse engineering regular expressions like '/edit/:webDomain' is tricky.
// Favor explicit code over smart code ftw.
