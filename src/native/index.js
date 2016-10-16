/* @flow */
/* eslint-disable react/require-extension */
// Bootstrap environment
const locales = require('./initialState.js').locales; // eslint-disable-line
const polyfillLocales = require('../server/intl/polyfillLocales');

polyfillLocales(global, locales);

require('./main');
