// Bootstrap environment
require('react-native-browser-polyfill');
require('../server/intl/polyfillLocales')(
  self,
  require('./initialState').default.intl.locales
);
// TODO: Consider.
// self.Promise = require('../common/configureBluebird');
require('./main');
