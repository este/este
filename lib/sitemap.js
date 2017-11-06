// @flow
import { defineMessages } from 'react-intl';

// Typed app urls FTW. It's possible only for object urls.
// Without Idris-like language, we can't have typed pretty urls based on regex.
// Still, this is the state of art approach.
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

// Must be separated from pages itself because pages are lazy loaded and MainNav
// would require all pages just because of their titles.
const titles = defineMessages({
  index: { defaultMessage: 'Home', id: 'sitemap.title.index' },
  signIn: { defaultMessage: 'Sign In', id: 'sitemap.title.signIn' },
  me: { defaultMessage: 'Me', id: 'sitemap.title.me' },
  edit: { defaultMessage: 'Edit', id: 'sitemap.title.edit' },
});

export default { titles };
