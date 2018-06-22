// @flow
import * as React from 'react';
import NextLink from 'next/link';
import type { Href } from '../app/sitemap';
import { format } from 'url';
import LocaleContext from './LocaleContext';
import { defaultLocale } from '../../constants';

// Link with current locale in query.
// This component is used by A and Link, no need to use it directly.
// TODO: https://github.com/este/este/issues/1399

export type LocaleLinkBaseProps = {|
  href: string | Href,
  prefetch?: boolean,
  replace?: boolean,
|};

type LocaleLinkProps = {|
  ...LocaleLinkBaseProps,
  children: React.Element<any>,
|};

class LocaleLink extends React.PureComponent<LocaleLinkProps> {
  static maybeAddLocaleToHref = (href: Href, locale: string) => {
    const isAppLink = href.pathname.charAt(0) === '/';
    const isDefault = defaultLocale === locale;
    const addLocale = isAppLink && !isDefault;
    if (!addLocale) return href;
    return {
      ...href,
      query: {
        ...(href.query || null),
        locale,
      },
    };
  };

  getHref(locale: string) {
    const { href } = this.props;
    // We don't process string URLs. They are considered as constants.
    if (typeof href === 'string') return href;
    return LocaleLink.maybeAddLocaleToHref(href, locale);
  }

  render() {
    const { children, prefetch, replace } = this.props;

    return (
      <LocaleContext.Consumer>
        {({ current }) => {
          const href = this.getHref(current);
          return (
            <NextLink href={href} prefetch={prefetch} replace={replace}>
              {/* Add href manually because Next.js does it only for browser anchor. */}
              {/* Ensure href is string because custom components. */}
              {React.cloneElement(children, {
                href: typeof href === 'object' ? format(href) : href,
              })}
            </NextLink>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}

export default LocaleLink;
