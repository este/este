// @flow

import { addLocaleData } from 'react-intl';

const addLocale = (locale, callback) => {
  addLocaleData(locale);
  callback();
};

const addIntl = (callback) => {
  require.ensure(['intl'], (require) => {
    if (!window.addIntl) {
      require('intl');
    }
    callback();
  }, 'intl');
};

// Note: require.ensure has to be static analysis friendly or Webpack
// does not bundle properly. The new async import should solve this
// in the future, but currently it does not support named chunks.
// Each language has two chunks, one containing polyfill data if the
// browser needs it, the other just locale data that all browsers need
// Intl is in a separate chunk to save bandwidth switching languages
// in polyfilled browsers. Check the network tab to see it in action.

const localeData = {
  // Czech
  cs: (callback) => require.ensure(['react-intl/locale-data/cs'], (require) =>
    addLocale(require('react-intl/locale-data/cs'), callback), 'cs'),

  cs_polyfill: (callback) => addIntl(() =>
    require.ensure(['intl/locale-data/jsonp/cs.js', 'react-intl/locale-data/cs'], (require) => {
      require('intl/locale-data/jsonp/cs.js');
      addLocale(require('react-intl/locale-data/cs'), callback);
    }, 'intl-cs')),

  // German
  de: (callback) => require.ensure(['react-intl/locale-data/de'], (require) =>
    addLocale(require('react-intl/locale-data/de'), callback), 'de'),

  de_polyfill: (callback) => addIntl(() =>
    require.ensure(['intl/locale-data/jsonp/de.js', 'react-intl/locale-data/de'], (require) => {
      require('intl/locale-data/jsonp/de.js');
      addLocale(require('react-intl/locale-data/de'), callback);
    }, 'intl-de')),

  // English
  en: (callback) => require.ensure(['react-intl/locale-data/en'], (require) =>
    addLocale(require('react-intl/locale-data/en'), callback), 'en'),

  en_polyfill: (callback) => addIntl(() =>
    require.ensure(['intl/locale-data/jsonp/en.js', 'react-intl/locale-data/en'], (require) => {
      require('intl/locale-data/jsonp/en.js');
      addLocale(require('react-intl/locale-data/en'), callback);
    }, 'intl-en')),

  // Spanish
  es: (callback) => require.ensure(['react-intl/locale-data/es'], (require) =>
    addLocale(require('react-intl/locale-data/es'), callback), 'es'),

  es_polyfill: (callback) => addIntl(() =>
    require.ensure(['intl/locale-data/jsonp/es.js', 'react-intl/locale-data/es'], (require) => {
      require('intl/locale-data/jsonp/es.js');
      addLocale(require('react-intl/locale-data/es'), callback);
    }, 'intl-es')),

  // French
  fr: (callback) => require.ensure(['react-intl/locale-data/fr'], (require) =>
    addLocale(require('react-intl/locale-data/fr'), callback), 'fr'),

  fr_polyfill: (callback) => addIntl(() =>
    require.ensure(['intl/locale-data/jsonp/fr.js', 'react-intl/locale-data/fr'], (require) => {
      require('intl/locale-data/jsonp/fr.js');
      addLocale(require('react-intl/locale-data/fr'), callback);
    }, 'intl-fr')),

  // Portuguese
  pt: (callback) => require.ensure(['react-intl/locale-data/pt'], (require) =>
    addLocale(require('react-intl/locale-data/pt'), callback), 'pt'),

  pt_polyfill: (callback) => addIntl(() =>
    require.ensure(['intl/locale-data/jsonp/pt.js', 'react-intl/locale-data/pt'], (require) => {
      require('intl/locale-data/jsonp/pt.js');
      addLocale(require('react-intl/locale-data/pt'), callback);
    }, 'intl-pt')),

  // Romanian
  ro: (callback) => require.ensure(['react-intl/locale-data/ro'], (require) =>
    addLocale(require('react-intl/locale-data/ro'), callback), 'ro'),

  ro_polyfill: (callback) => addIntl(() =>
    require.ensure(['intl/locale-data/jsonp/ro.js', 'react-intl/locale-data/ro'], (require) => {
      require('intl/locale-data/jsonp/ro.js');
      addLocale(require('react-intl/locale-data/ro'), callback);
    }, 'intl-ro')),
};

export const loadLocale = (locale) => new Promise((resolve) => {
  if (!localeData[locale]) {
    locale = 'en';
  }

  if (!window.Intl || window.IntlPolyfill) {
    locale += '_polyfill';
  }

  return localeData[locale](resolve);
});
