// @flow
import type { State } from '../types';
import NextLink from 'next/link';
import React from 'react';
import parse from 'url-parse';
import { connect } from 'react-redux';

// For domain example.com, do not anything with a link.
// For i18n domain example.com?locale=foo, add locale=foo to a link.
// TODO: Use subdomain for production.

type LocaleLinkProps = {
  children: React$Element<*>,
  href: string,
  prefetch?: boolean,
  locale: *,
};

const LocaleLink = ({ children, href, prefetch, locale }: LocaleLinkProps) => {
  let localeHref = href;
  const parsed = parse(href, true);
  const isRelative = href.charAt(0) === '/';
  // TODO: i18n subdomain for production.
  const hasNoLocale = !parsed.query.locale;
  const setLocale = isRelative && hasNoLocale;
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
}))(LocaleLink);
