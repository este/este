// Bootstrap environment
require('react-native-browser-polyfill');

// global.Intl Polyfill
// Server polyfillLocales doesn't work anymore, because packager error:
// Encountered an error while persisting cache:
// > Error: TimeoutError: transforming /Users/este/dev/este/node_modules
// /intl/locale-data/complete.js took longer than 301 seconds.
// require('../server/intl/polyfillLocales')(
//   self,
//   require('./initialState.js').locales
// );
// Workaround:
// Remove "require('./locale-data/complete.js');" from node_modules/intl/index
// We can't change that code, but we can reimplement it easily.
// Expose `IntlPolyfill` as global to add locale data into runtime later on.
global.IntlPolyfill = require('../../node_modules/intl/lib/core.js');
global.Intl = global.IntlPolyfill;
global.IntlPolyfill.__applyLocaleSensitivePrototypes();
// App locales are defined in src/server/config.js
require('../../node_modules/intl/locale-data/jsonp/cs.js');
require('../../node_modules/intl/locale-data/jsonp/de.js');
require('../../node_modules/intl/locale-data/jsonp/en.js');
require('../../node_modules/intl/locale-data/jsonp/es.js');
require('../../node_modules/intl/locale-data/jsonp/fr.js');
require('../../node_modules/intl/locale-data/jsonp/pt.js');
require('../../node_modules/intl/locale-data/jsonp/ro.js');
const cs = require('react-intl/locale-data/cs');
const de = require('react-intl/locale-data/de');
const en = require('react-intl/locale-data/en');
const es = require('react-intl/locale-data/es');
const fr = require('react-intl/locale-data/fr');
const pt = require('react-intl/locale-data/pt');
const ro = require('react-intl/locale-data/ro');
const { addLocaleData } = require('react-intl');
[cs, de, en, es, fr, pt, ro].forEach(locale => addLocaleData(locale));

// TODO: Consider.
// self.Promise = require('../common/configureBluebird');
require('./main');
