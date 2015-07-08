const config = require('./config');

if (config.isProduction || require('piping')(config.piping)) {
  if (!process.env.NODE_ENV)
    throw new Error('Environment variable NODE_ENV isn\'t set. Remember it\'s up your production enviroment to set NODE_ENV and maybe other variables. To run app locally in production mode, use gulp -p command instead.');

  // Load and use polyfill for ECMA-402.
  if (!global.Intl)
    global.Intl = require('intl');

  require('babel/register')({optional: ['es7']});

  // To ignore webpack custom loaders on server.
  config.webpackStylesExtensions.forEach(function(ext) {
    require.extensions['.' + ext] = function() {};
  });

  require('./main');
}
