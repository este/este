// @flow
const { URL } = require('url');

// https://github.com/FormidableLabs/babel-plugin-transform-define
// This file is cached in node-modules. To refresh cache, run:
// yarn clean-babel-cache

// Remember, never put secrets here. This is for development.
// For secrets, use environment variables exclusively.

const production = process.env.NODE_ENV === 'production';

module.exports = {
  APP_VERSION:
    process.env.APP_VERSION != null ? process.env.APP_VERSION : 'dev', // Git commit SHA.
  GRAPHQL_ENDPOINT: production
    ? 'http://localhost:4000'
    : 'http://localhost:4000',
  HOSTNAME:
    process.env.NOW_URL != null
      ? new URL(process.env.NOW_URL).hostname
      : 'localhost:3000/',
};
