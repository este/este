const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE } = process.env;

module.exports = {
  webpack: function(config, { isServer }) {
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        }),
      );
    }

    // console.log(config);

    config.resolve = {
      ...config.resolve,
      // .web.js is for React Native Web.
      extensions: ['.web.js', '.mjs', '.js', '.json'],
    };

    return config;
  },
};
