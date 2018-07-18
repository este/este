// @flow
import * as React from 'react';
import Text from './Text';
import LocaleContext from './LocaleContext';
import { defaultLocale } from '../../server/constants';

class SwitchLocale extends React.PureComponent<{}> {
  static localeToLanguageName = (locale: string) => {
    switch (locale) {
      case 'cs':
        return 'čeština';
      case 'en':
        return 'english';
      default:
        return locale;
    }
  };

  static getLocaleHref = (pathname: string, locale: string) => {
    if (defaultLocale === locale) return pathname;
    return `${pathname}?locale=${locale}`;
  };

  render() {
    return (
      <LocaleContext.Consumer>
        {({ current, supported }) => (
          <Text>
            {supported
              .filter(locale => locale !== current)
              .map((locale, index, locales) => (
                // We can't use Next.js Link via core/A because we have to
                // enforce full reload.
                // Check server.js getAcceptedOrDefaultLocale.
                <Text
                  accessibilityRole="link"
                  color="primary"
                  href={SwitchLocale.getLocaleHref('/', locale)}
                  key={locale}
                >
                  {SwitchLocale.localeToLanguageName(locale)}
                  {locale.length > 1 && index < locales.length - 1 && ', '}
                </Text>
              ))}
          </Text>
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default SwitchLocale;
