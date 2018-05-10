// @flow
import * as React from 'react';
import Text from './Text';
import LocaleContext from './LocaleContext';
import SupportedLocalesContext from './SupportedLocalesContext';
import { defaultLocale } from '../../server/constants';

class SwitchLocale extends React.PureComponent<{}> {
  static getLocaleHref = (pathname: string, locale: string) => {
    if (defaultLocale === locale) return pathname;
    return `${pathname}?locale=${locale}`;
  };

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

  render() {
    return (
      <SupportedLocalesContext.Consumer>
        {supportedLocales => (
          <LocaleContext.Consumer>
            {locale => (
              <Text>
                {supportedLocales
                  .filter(supportedLocale => supportedLocale !== locale)
                  .map((supportedLocale, index, locales) => (
                    // We can't use Next.js Link via core/A because we have to
                    // enforce full reload.
                    // Check server.js getAcceptedOrDefaultLocale.
                    <Text
                      accessibilityRole="link"
                      color="primary"
                      href={SwitchLocale.getLocaleHref('/', supportedLocale)}
                      key={supportedLocale}
                    >
                      {SwitchLocale.localeToLanguageName(supportedLocale)}
                      {supportedLocale.length > 1 &&
                        index < locales.length - 1 &&
                        ', '}
                    </Text>
                  ))}
              </Text>
            )}
          </LocaleContext.Consumer>
        )}
      </SupportedLocalesContext.Consumer>
    );
  }
}

export default SwitchLocale;
