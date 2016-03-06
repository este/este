// http://www.codedependant.net/2015/01/31/production-ready-node-configuration
import nconf from 'nconf';

const isProduction = process.env.NODE_ENV === 'production';

// Specifying an env delimiter allows us to override config when shipping to
// production server. 'foo__bar=2 gulp' will set config to '{foo: {bar: 2}}'
nconf.env('__');

// For local development with secrets, create git ignored secrets.json file.
// nconf.file('src/common/secrets.json');

// Remember, never put secrets in this file. To override default values for
// production, use environment variables.
nconf.defaults({
  firebaseUrl: 'https://este.firebaseio.com',
  googleAnalyticsId: 'UA-XXXXXXX-X',
  isProduction,
  port: process.env.PORT || 8000
});

export default nconf.get();
