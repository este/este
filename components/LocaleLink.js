// @flow
import type { State } from '../types';
import NextLink from 'next/link';
import React, { type Element } from 'react';
import parse from 'url-parse';
import { connect, type Connector } from 'react-redux';

// Link with current locale in query.
// TODO: Use subdomain for production.

const LocaleLink = ({ children, href, prefetch, locale, defaultLocale }) => {
  let localeHref = href;
  const parsed = parse(href, true);
  const isRelative = href.charAt(0) === '/';
  const isNotDefault = locale !== defaultLocale;
  // TODO: i18n subdomain for production.
  const hasNoLocale = !parsed.query.locale;
  const setLocale = isRelative && isNotDefault && hasNoLocale;
  if (setLocale) {
    parsed.set('query', { ...parsed.query, locale });
    localeHref = parsed.href.replace(parsed.origin, '');
  }
  return (
    <NextLink href={localeHref} prefetch={prefetch}>
      {React.cloneElement(children, { href: localeHref })}
    </NextLink>
  );
};

type OwnProps = {
  href: string,
  children: Element<any>,
  prefetch?: boolean,
};

type Props = OwnProps & {
  locale: string,
  defaultLocale: string,
};

const connector: Connector<OwnProps, Props> = connect(({ app }: State) => ({
  locale: app.locale,
  defaultLocale: app.defaultLocale,
}));

export default connector(LocaleLink);
