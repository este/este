// @flow
import * as React from 'react';
import type { State } from '../types';
import NextLink from 'next/link';
import { connect, type Connector, type MapStateToProps } from 'react-redux';
import { maybeMapLinkHref, type Href } from '../lib/sitemap';
import { format } from 'url';

// Link with current locale in query.
// This component is used by A and Link, no need to use it directly.
// TODO: https://github.com/este/este/issues/1399

export type LocaleLinkBaseProps = {
  href: string | Href,
  prefetch?: boolean,
  replace?: boolean,
};

type LocaleLinkProps = LocaleLinkBaseProps & { children: React.Element<any> };

// href: any, because Href type does not specify locale query.
// That's fine, because locale is an implementation detail.
// I don't know how to type it correctly.
const maybeAddLocaleToHref = (href: any, defaultLocale, locale) => {
  const isAppLink = href.pathname.charAt(0) === '/';
  const isDefault = defaultLocale === locale;
  const addLocale = isAppLink && !isDefault;
  if (!addLocale) return href;
  return {
    ...href,
    query: {
      ...href.query,
      locale,
    },
  };
};

const LocaleLink = ({
  children,
  href: originalHref,
  prefetch,
  replace,
  locale,
  defaultLocale,
}) => {
  let href;
  let as;

  if (typeof originalHref === 'string') {
    // We don't process string URLs. They are considered as constants.
    href = originalHref;
  } else {
    href = maybeAddLocaleToHref(originalHref, defaultLocale, locale);
    as = maybeMapLinkHref(href);
  }
  return (
    <NextLink
      {...(as ? { as } : null)}
      href={href}
      prefetch={prefetch}
      replace={replace}
    >
      {/* Add href manually because Next.js does it only for browser anchor. */}
      {/* Ensure href is string because custom components. */}
      {React.cloneElement(children, {
        href: as || (typeof href === 'object' ? format(href) : href),
      })}
    </NextLink>
  );
};

const mapStateToProps: MapStateToProps<*, *, *> = (state: State) => ({
  locale: state.app.locale,
  defaultLocale: state.app.defaultLocale,
});

const connector: Connector<LocaleLinkProps, *> = connect(mapStateToProps);

export default connector(LocaleLink);
