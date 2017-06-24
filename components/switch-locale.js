// @flow
import type { State } from '../types';
import Text from './text';
import Set from './set';
import { connect, type Connector } from 'react-redux';

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

type ConnectorProps = {
  pathname: string,
};

const connector: Connector<ConnectorProps, *> = connect((state: State) => ({
  defaultLocale: state.app.defaultLocale,
  locale: state.app.locale,
  supportedLocales: state.app.supportedLocales,
}));

export default connector(SwitchLocale);
