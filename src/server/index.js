var areIntlLocalesSupported = require('intl-locales-supported');
const config = require('./config');

if (config.isProduction || require('piping')(config.piping)) {
  if (!process.env.NODE_ENV)
    throw new Error('Environment variable NODE_ENV isn\'t set. Remember it\'s up your production enviroment to set NODE_ENV and maybe other variables. To run app locally in production mode, use gulp -p command instead.');

  if (global.Intl) {
    // Use polyfill if language support for required languages is missing.
    // See: http://formatjs.io/guides/runtime-environments/#polyfill-node
    if (!areIntlLocalesSupported(config.appLocales)) {
      const IntlPolyfill = require('intl');
      global.Intl.NumberFormat = IntlPolyfill.NumberFormat;
      global.Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
  } else {
    // No `Intl`, so load and use polyfill for ECMA-402.
    global.Intl = require('intl');
  }

  require('babel/register')({optional: ['es7']});

  // To ignore webpack custom loaders on server.
  config.webpackStylesExtensions.forEach(function(ext) {
    require.extensions['.' + ext] = function() {};
  });

  require('./main');
}
