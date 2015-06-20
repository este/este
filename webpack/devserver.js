/* @flow weak */

'use strict';

var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = function(webpackConfig) {
  return function(callback) {
    new WebpackDevServer(webpack(webpackConfig), {
      contentBase: 'http://localhost:8888',
      hot: true,
      publicPath: webpackConfig.output.publicPath,
      // Unfortunately quiet swallows everything even error so it can't be used.
      quiet: false,
      // No info filters only initial compilation it seems.
      noInfo: true,
      // Remove console.log mess during watch.
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    // Why '0.0.0.0' and 'localhost'? Because it works for remote machines.
    // https://github.com/webpack/webpack-dev-server/issues/151#issuecomment-104643642
    }).listen(8888, '0.0.0.0', function(err) {
      // Callback is called only once, can't be used to catch compilation errors.
      if (err)
        throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log('[webpack-dev-server]', 'localhost:8888/build/client.js');
      callback();
    });
  };
};
