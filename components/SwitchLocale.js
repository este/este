// @flow
import React from 'react';
import Text from './Text';
import type { State } from '../types';
import { connect } from 'react-redux';

// TODO: i18n subdomain for production.
const getLocaleHref = (pathname, defaultLocale, locale) => {
  if (defaultLocale === locale) return pathname;
  return `${pathname}?locale=${locale}`;
};

const SwitchLocale = ({ defaultLocale, locale, supportedLocales }) =>
  <Text>
    {supportedLocales
      .filter(supportedLocale => supportedLocale !== locale)
      .map((supportedLocale, index, locales) =>
        <Text
          as="a"
          color="primary"
          href={getLocaleHref('/', defaultLocale, supportedLocale)}
          key={supportedLocale}
          size={-1}
        >
          {supportedLocale}
          {supportedLocale.length > 1 && index < locales.length - 1 && ', '}
        </Text>,
      )}
  </Text>;

export default connect((state: State) => ({
  defaultLocale: state.app.defaultLocale,
  locale: state.app.locale,
  supportedLocales: state.app.supportedLocales,
}))(SwitchLocale);
