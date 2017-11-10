// @flow
const { defineMessages } = require('react-intl');
const pathMatch = require('path-match');
const { format, parse } = require('url');

// This file is written as plain JS because it's required by the /server.js
// Next.js does not transpile custom servers for good reason.

// Must be separated from pages itself because pages are lazy loaded and MainNav
// would require all pages just because of their titles.
const titles = defineMessages({
  index: {
    defaultMessage: 'Home',
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
  edit: {
    defaultMessage: 'Edit',
    id: 'sitemap.title.edit',
  },
});

/*::
export type EditQuery = {| domain: string |};
*/

// With Href type, we can ensure all app links are correct at build time.
/*::
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
      query: EditQuery,
    |};
*/

// URL's mapping. Remember, pretty URLs are overrated for almost all use cases.
const match = pathMatch();

// This can't be typed because it's dynamic code.
const mappers = {
  '/edit': {
    req: match('/edit/:domain'),
    link: ({ pathname, query: { domain, ...query } }) => ({
      pathname: `${pathname}/${domain}`,
      query,
    }),
  },
};

const maybeMapReqUrl = (url /* : string */) => {
  const { pathname, query } = parse(url, true);
  for (const mapPathname in mappers) {
    const match = mappers[mapPathname].req;
    const params = match(pathname);
    if (params !== false) {
      return {
        pathname: mapPathname,
        query: { ...params, ...query },
      };
    }
  }
};

const maybeMapLinkHref = (href /* : Object*/) => {
  const mapper = mappers[href.pathname];
  if (!mapper) return;
  return format(mapper.link(href));
};

module.exports = {
  titles,
  maybeMapReqUrl,
  maybeMapLinkHref,
};
