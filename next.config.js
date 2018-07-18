const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const {
  WebpackBundleSizeAnalyzerPlugin,
} = require('webpack-bundle-size-analyzer');

const { ANALYZE } = process.env;

module.exports = {
  webpack(config, { isServer }) {
    switch (ANALYZE) {
      case 'BUNDLES':
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true,
          }),
        );
        break;
      case 'SIZE':
        config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'));
        break;
    }

    // eslint-disable-next-line no-param-reassign
    config.resolve = {
      ...config.resolve,
      // .web.js is for React Native Web.
      extensions: ['.web.js', '.js', '.json'],
    };

    return config;
  },
};
