require('babel-register');
require('babel-polyfill');

const Bluebird = require('bluebird');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const config = require('../common/config');
const rootDir = require('path').resolve(__dirname, '..', '..');
const webpackIsomorphicAssets = require('../../webpack/assets');

if (!process.env.NODE_ENV) {
  throw new Error(
    'Environment variable NODE_ENV must be set to development or production.'
  );
}

// http://bluebirdjs.com/docs/why-bluebird.html
global.Promise = Bluebird;

// http://formatjs.io/guides/runtime-environments/#polyfill-node
if (global.Intl) {
  // We don't have to check whether Node runtime supports specific language,
  // because without special build it does support only english anyway.
  require('intl');
  global.Intl.NumberFormat = global.IntlPolyfill.NumberFormat;
  global.Intl.DateTimeFormat = global.IntlPolyfill.DateTimeFormat;
} else {
  global.Intl = require('intl');
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicAssets)
  .development(!config.isProduction)
  .server(rootDir, () => {
    require('./main');
  });
