const withTypescript = require('@zeit/next-typescript');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

require('dotenv').config();

const { API_ENDPOINT } = process.env;
if (!API_ENDPOINT) {
  throw Error(`Did you run 'npm run env dev'?`);
}

module.exports = withBundleAnalyzer(
  withTypescript({
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html',
      },
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html',
      },
    },
    publicRuntimeConfig: {
      apiEndpoint: API_ENDPOINT,
    },
  }),
);
