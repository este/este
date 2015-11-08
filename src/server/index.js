const serverConfig = require('./config');

// http://formatjs.io/guides/runtime-environments/#polyfill-node
if (global.Intl) {
  // We don't have to check whether Node runtime supports specific language,
  // because without special build it does support only english anyway.
  require('intl');
  global.Intl.NumberFormat = global.IntlPolyfill.NumberFormat;
  global.Intl.DateTimeFormat = global.IntlPolyfill.DateTimeFormat;
}
else {
  global.Intl = require('intl');
}

require('babel/register')({optional: ['es7']});

// To ignore webpack custom loaders on server.
serverConfig.webpackStylesExtensions.forEach(function(ext) {
  require.extensions['.' + ext] = function() {};
});

require('./main');
