// @flow

// Bootstrap environment
require('babel-register');
require('babel-polyfill');

const IsoTools = require('webpack-isomorphic-tools');
const assets = require('../../webpack/assets').default;
const config = require('./config').default;
const polyfillLocales = require('./intl/polyfillLocales');
const rootDir = require('path').resolve(__dirname, '..', '..');

if (!process.env.NODE_ENV) {
  const message = 'Environment variable NODE_ENV must be set to development or production.';
  throw new Error(message);
}

polyfillLocales(global, config.locales);

global.webpackIsomorphicTools = new IsoTools(assets).server(rootDir, () => {
  require('./main');
});
