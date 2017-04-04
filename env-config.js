// @flow
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  BACKEND_URL: prod
    ? 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn'
    : 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
};
