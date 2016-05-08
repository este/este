// Bootstrap environment
require('babel-polyfill');
window.Promise = require('../common/configureBluebird');
require('./main');
