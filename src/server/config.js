const hashFile = require('hash-file');
const nconf = require('nconf');

const isProduction = process.env.NODE_ENV === 'production';

// Specifying an env delimiter allows you to override below config when shipping
// to production server.
nconf.env('__');

function getAssetHash(filePath) {
  if (!isProduction) return '';
  try {
    return hashFile.sync(filePath);
  }
  catch (e) {
    return '';
  }
}

// Remember, never put production secrets in config. Use nconf.
const config = {
  assetsHashes: {
    appCss: getAssetHash('build/app.css'),
    appJs: getAssetHash('build/app.js')
  },
  isProduction: isProduction,
  googleAnalyticsId: 'UA-XXXXXXX-X',
  port: process.env.PORT || 8000,
  webpackStylesExtensions: ['css', 'less', 'sass', 'scss', 'styl']
};

// Use above config as a default one. Multiple other providers are available
// like loading config from json and more. Check out nconf docs.
nconf.defaults(config);

module.exports = nconf.get();
