// @flow
const { URL } = require('url');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  GRAPHQL_ENDPOINT: production
    ? 'http://localhost:4000'
    : 'http://localhost:4000',
  HOSTNAME:
    process.env.NOW_URL != null
      ? new URL(process.env.NOW_URL).hostname
      : 'localhost:3000/',
};
