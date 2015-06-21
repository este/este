/* eslint-env node */

module.exports = function(config) {

  config.set({
    basePath: '',
    // autoWatch: true, // It automagically works enabled or not. Probably defined by singleRun.
    browsers: ['ChromeSmall'],
    customLaunchers: {
      ChromeSmall: {
        base: 'Chrome',
        // Unfortunately it's not possible to hide browser via negative position,
        // and minimized browser is not detected by Karma.
        flags: ['--window-size=200,200']
      }
    },
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],
    basePath: '',
    files: [
      'src/test/index.js'
    ],

    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // preprocess with webpack and our sourcemap loader
      'src/test/index.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack/makeconfig')(true),
    webpackServer: {
      noInfo: true
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: process.env.CONTINUOUS_INTEGRATION ? [
      'coverage'
    ] : [
      'progress', 'coverage', 'notify'
    ],

    notifyReporter: {
      reportSuccess: false
    },

    coverageReporter: process.env.CONTINUOUS_INTEGRATION ? {
      type: 'lcov',
      dir: 'coverage/'
    } : {
      type: 'html',
      dir: 'coverage/'
    },
    exclude: ['./node_modules'],
    port: 9876,
    logLevel: process.env.CONTINUOUS_INTEGRATION ? config.LOG_WARN : config.LOG_INFO
  });

};
