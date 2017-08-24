// @flow
const package = require('./package.json');
const { URL } = require('url');

// https://github.com/FormidableLabs/babel-plugin-transform-define
// This file is cached in node-modules. To refresh cache, run:
// yarn rimrafBabelCache

// Remember, never put secrets here. This is for development.
// For secrets, use environment variables exclusively.

const production = process.env.NODE_ENV === 'production';
// https://sentry.io/este/estenowsh/settings/keys
// It's secret, so it must be defined as environment variable.
const SENTRY_SERVER_DNS = process.env.SENTRY_SERVER_DNS || '';

module.exports = {
  APP_NAME: package.name,
  APP_VERSION: process.env.APP_VERSION || 'dev', // Git commit SHA.
  DEFAULT_LOCALE: 'en',
  GRAPHQL_ENDPOINT: production
    ? 'https://api.graph.cool/relay/v1/cj6cs45nx2bg50121ylh22x7b'
    : 'https://api.graph.cool/relay/v1/cj6cs45nx2bg50121ylh22x7b',
  HOSTNAME: process.env.NOW_URL
    ? new URL(process.env.NOW_URL).hostname
    : 'localhost:3000/',
  SENTRY_CLIENT_DNS:
    'https://a4e0be7d7bbf415b99ce482d20bc425b@sentry.io/200324',
  SENTRY_SERVER_DNS,
};
