// Bootstrap environment
require('react-native-browser-polyfill');
require('../server/intl/polyfillLocales')(
  self,
  require('./config').default.locales
);
// TODO: Consider.
// self.Promise = require('../common/configureBluebird');
require('./main');
