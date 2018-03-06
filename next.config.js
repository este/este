// This file is not going through babel transformation.
// So, we write it in vanilla JS.
// (But you could use ES2015 features supported by your Node.js version)
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
      );
    }

    // We are using eslint-loader in webpack to lint only imported modules.
    config.module.rules.unshift({
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
    });

    return config;
  },
};
