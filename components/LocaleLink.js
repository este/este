// @flow
import type { State } from '../types';
import NextLink from 'next/link';
import * as React from 'react';
import parse from 'url-parse';
import { connect } from 'react-redux';

// For domain example.com, do not anything with a link.
// For i18n domain example.com?locale=foo, add locale=foo to a link.
// TODO: Use subdomain for production.

type LocaleLinkProps = {
  children: React.Element<any>,
  href: string,
  prefetch?: boolean,
  locale: *,
  defaultLocale: *,
};

const LocaleLink = ({
  children,
  href,
  prefetch,
  locale,
  defaultLocale,
}: LocaleLinkProps) => {
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

export default connect(({ app }: State) => ({
  locale: app.locale,
  defaultLocale: app.defaultLocale,
}))(LocaleLink);
