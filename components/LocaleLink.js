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

const maybeAddLocaleToHref = (defaultLocale, locale, href) => {
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
  // $FlowFixMe Href does not define query locale.
  href,
  prefetch,
  replace,
  locale,
  defaultLocale,
}) => {
  const localeHref = maybeAddLocaleToHref(defaultLocale, locale, href);
  return (
    <NextLink href={localeHref} prefetch={prefetch} replace={replace}>
      {/* Add href manually because Next.js does it only for browser anchor. */}
      {React.cloneElement(children, {
        href: typeof localeHref === 'object' ? format(localeHref) : localeHref,
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
