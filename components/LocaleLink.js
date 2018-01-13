// @flow
import * as React from 'react';
import NextLink from 'next/link';
import { maybeMapLinkHref, type Href } from '../lib/sitemap';
import { format } from 'url';
import Locale from './Locale';

// Link with current locale in query.
// This component is used by A and Link, no need to use it directly.
// TODO: https://github.com/este/este/issues/1399

export type LocaleLinkBaseProps = {
  href: string | Href,
  prefetch?: boolean,
  replace?: boolean,
};

type LocaleLinkProps = LocaleLinkBaseProps & { children: React.Element<any> };

class LocaleLink extends React.PureComponent<LocaleLinkProps> {
  static maybeAddLocaleToHref = (href: Href, locale: string) => {
    const isAppLink = href.pathname.charAt(0) === '/';
    const isDefault = DEFAULT_LOCALE === locale;
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

  getAsAndHref(locale: string) {
    const { href } = this.props;
    // We don't process string URLs. They are considered as constants.
    if (typeof href === 'string') return [null, href];
    const localeHref = LocaleLink.maybeAddLocaleToHref(href, locale);
    const as = maybeMapLinkHref(href);
    return [as, localeHref];
  }

  render() {
    const { children, prefetch, replace } = this.props;

    return (
      <Locale>
        {({ locale }) => {
          const [as, href] = this.getAsAndHref(locale);
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
        }}
      </Locale>
    );
  }
}

export default LocaleLink;
