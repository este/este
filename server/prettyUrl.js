// @flow
const pathMatch = require('path-match');
const { format, parse } = require('url');

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

const maybeReqUrl = (url /* : string */) => {
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

const maybeLinkHref = (href /* : Object*/) => {
  const mapper = mappers[href.pathname];
  if (!mapper) return;
  return format(mapper.link(href));
};

module.exports = {
  maybeReqUrl,
  maybeLinkHref,
};
