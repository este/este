// @flow
import React from 'react';
import type { State } from '../types';
import Text from './Text';
import Set from './Set';
import { connect } from 'react-redux';

// TODO: i18n subdomain for production.
const getLocaleHref = (pathname, defaultLocale, locale) => {
  if (defaultLocale === locale) return pathname;
  return `${pathname}?locale=${locale}`;
};

const SwitchLocale = ({ pathname, defaultLocale, locale, supportedLocales }) =>
  <Set spaceBetween={1}>
    {supportedLocales.map(supportedLocale =>
      <Text
        as="a"
        color="primary"
        decoration={supportedLocale === locale ? 'underline' : 'none'}
        href={getLocaleHref(pathname, defaultLocale, supportedLocale)}
        key={supportedLocale}
        size={2}
      >
        {supportedLocale}
      </Text>,
    )}
  </Set>;

// type ConnectorProps = {
//   pathname: string,
// };

export default connect((state: State) => ({
  defaultLocale: state.app.defaultLocale,
  locale: state.app.locale,
  supportedLocales: state.app.supportedLocales,
}))(SwitchLocale);
