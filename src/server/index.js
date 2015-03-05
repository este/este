// Load and use polyfill for ECMA-402.
if (!global.Intl)
  global.Intl = require('intl');

if (!process.env.NODE_ENV)
  throw new Error('Enviroment variable NODE_ENV must be set.');

require('babel/register');

var config = require('./config');

// To ignore webpack custom loaders on server.
config.webpackStylesExtensions.forEach(function(ext) {
  require.extensions['.' + ext] = function() {}
});

require('./main');
