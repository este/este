// This file is not going through babel transformation.
// So, we write it in vanilla JS.
// (But you could use ES2015 features supported by your Node.js version)
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { assocPath } = require('ramda');

const eslintRule = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  loader: 'eslint-loader',
};

module.exports = {
  webpack: (config, { dev }) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        }),
      );
    }
    // TODO: Figure out, how to render errors as warnings in dev mode.
    // https://github.com/MoOx/eslint-loader/issues/174
    if (dev) return config;
    const rules = [].concat(eslintRule, config.module.rules);
    return assocPath(['module', 'rules'], rules, config);
  },
};
