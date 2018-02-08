// @flow
const { URL } = require('url');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  GRAPHQL_ENDPOINT: production
    ? 'http://localhost:4000'
    : 'http://localhost:4000',
};
