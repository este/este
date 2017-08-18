// This file is not going through babel transformation.
// So, we write it in vanilla JS.
// (But you could use ES2015 features supported by your Node.js version)
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { assocPath } = require('ramda');

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

    // We are using eslint-loader in webpack to lint only imported modules.
    const eslintRule = {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // Emit errors as warnings for dev to not break webpack build.
        // Eslint errors are shown in console for dev, yay :-)
        emitWarning: dev,
      },
    };

    const rules = [].concat(eslintRule, config.module.rules);
    return assocPath(['module', 'rules'], rules, config);
  },
};
