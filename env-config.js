// @flow
const package = require('./package.json');

// github.com/FormidableLabs/babel-plugin-transform-define
// This file is cached in node-modules. That's why we rimraf cache before build.

const production = process.env.NODE_ENV === 'production';

module.exports = {
  APP_NAME: package.name,
  APP_VERSION: process.env.APP_VERSION || 'dev',
  DEFAULT_LOCALE: 'en',
  DOMAIN: production ? 'example.com' : 'localhost:3000/',
  GRAPHQL_ENDPOINT: production
    ? 'https://api.graph.cool/simple/v1/cj157d6lgacrd01553jnd34tv'
    : 'https://api.graph.cool/simple/v1/cj157d6lgacrd01553jnd34tv',
};
