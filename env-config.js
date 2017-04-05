// @flow
const production = process.env.NODE_ENV === 'production';

module.exports = {
  BACKEND_URL: production
    ? 'https://api.graph.cool/simple/v1/cj157d6lgacrd01553jnd34tv'
    : 'https://api.graph.cool/simple/v1/cj157d6lgacrd01553jnd34tv',
};
