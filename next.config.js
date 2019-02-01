const withTypescript = require('@zeit/next-typescript');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

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
    ...(process.env.NOW_REGION ? { target: 'serverless' } : null),
  }),
);
