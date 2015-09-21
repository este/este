/* eslint-disable no-var */

var hashFile = require('hash-file');
var nconf = require('nconf');

var isProduction = process.env.NODE_ENV === 'production';

// Specifying an env delimiter allows you to override below config when shipping
// to production server.
nconf.env('__');

var config = {
  assetsHashes: {
    appCss: isProduction ? hashFile.sync('build/app.css') : '',
    appJs: isProduction ? hashFile.sync('build/app.js') : ''
  },
  appLocales: ['en', 'fr'],
  defaultLocale: 'en',
  googleAnalyticsId: 'UA-XXXXXXX-X',
  isProduction: isProduction,
  piping: {
    // Ignore webpack custom loaders on server. TODO: Reuse index.js config.
    ignore: /(\/\.|~$|\.(css|less|sass|scss|styl))/,
    // Hook false ensures server is restarted only on server files change.
    // True would restart server on any file change, but it doesn't work with
    // hot reloading. This means browser reload will always get stale react
    // components which results to React attempted to reuse markup warning.
    // But that's fine, because with new react-transform we don't have to
    // reload browser during development anymore.
    hook: false
  },
  port: process.env.PORT || 8000,
  webpackStylesExtensions: ['css', 'less', 'sass', 'scss', 'styl']
};

// Use above config as a default one. Multiple other providers are available
// like loading config from json and more. Check out nconf docs.
nconf.defaults(config);

module.exports = nconf.get();
