// @flow
import * as React from 'react';
import type { State } from '../types';
import NextLink from 'next/link';
import { connect, type Connector, type MapStateToProps } from 'react-redux';
import type { Href } from '../lib/sitemap';
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

// href: any, because Href does not specify query locale, and that's right.
// query locale is an implementation detail. Unfortunately, I don't know why
// Flow checks it here. Therefore, I had to disable type checking via any type.
const maybeAddLocaleToHref = (defaultLocale, locale, href: any) => {
  if (typeof href === 'string') return href;
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
  href: hrefWithoutLocale,
  prefetch,
  replace,
  locale,
  defaultLocale,
}) => {
  const href = maybeAddLocaleToHref(defaultLocale, locale, hrefWithoutLocale);
  return (
    <NextLink href={href} prefetch={prefetch} replace={replace}>
      {/* Add href manually because Next.js does it only for browser anchor. */}
      {/* Ensure href is string because custom components. */}
      {React.cloneElement(children, {
        href: typeof href === 'object' ? format(href) : href,
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
