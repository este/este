var areIntlLocalesSupported = require('intl-locales-supported'); // eslint-disable-line no-var

// https://github.com/yahoo/intl-locales-supported#usage
module.exports = function polyfillLocales(global, locales) {
  if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(locales)) {
      // `Intl` exists, but it doesn't have the data we need, so load the
      // polyfill and replace the constructors we need with the polyfill's.
      require('intl');
      Intl.NumberFormat = IntlPolyfill.NumberFormat; // eslint-disable-line no-undef
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat; // eslint-disable-line no-undef
    }
  } else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
  }
};
