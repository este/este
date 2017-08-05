// @flow
const package = require('./package.json');
const { URL } = require('url');

// https://github.com/FormidableLabs/babel-plugin-transform-define
// This file is cached in node-modules. To refresh cache, run:
// yarn rimrafBabelCache

const production = process.env.NODE_ENV === 'production';

module.exports = {
  APP_NAME: package.name,
  APP_VERSION: process.env.APP_VERSION || 'dev',
  DEFAULT_LOCALE: 'en',
  HOSTNAME: process.env.NOW_URL
    ? new URL(process.env.NOW_URL).hostname
    : 'localhost:3000/',
  GRAPHQL_ENDPOINT: production
    ? 'https://api.graph.cool/relay/v1/Este'
    : 'https://api.graph.cool/relay/v1/Este',
};
