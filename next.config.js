// This file is not going through babel transformation.
// So, we write it in vanilla JS.
// (But you could use ES2015 features supported by your Node.js version)
const { assocPath } = require('ramda');

const eslintRule = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  loader: 'eslint-loader',
};

module.exports = {
  webpack: (config, { dev }) => {
    const rules = [].concat(eslintRule, config.module.rules);
    return assocPath(['module', 'rules'], rules, config);
  },
};
