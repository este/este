 // Bootstrap environment
const onWindowIntl = () => {
  require('babel-polyfill');
  window.Promise = require('../common/configureBluebird');
  require('./main');
};
// github.com/andyearnshaw/Intl.js/#intljs-and-browserifywebpack
if (!window.Intl) {
  // App supported locales are defined in src/server/config.js
  // Note the explicit enumeration, that's because static analysis ftw.
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/cs.js',
    'intl/locale-data/jsonp/de.js',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/es.js',
    'intl/locale-data/jsonp/fr.js',
    'intl/locale-data/jsonp/pt.js',
    'intl/locale-data/jsonp/ro.js',
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/cs.js');
    require('intl/locale-data/jsonp/de.js');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/es.js');
    require('intl/locale-data/jsonp/fr.js');
    require('intl/locale-data/jsonp/pt.js');
    require('intl/locale-data/jsonp/ro.js');
    onWindowIntl();
  });
} else {
  onWindowIntl();
}
