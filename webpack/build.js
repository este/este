/* @flow weak */

'use strict';

var webpack = require('webpack');
var gutil = require('gulp-util');

module.exports = function(webpackConfig) {
  return function(callback) {
    webpack(webpackConfig, function(fatalError, stats) {
      var jsonStats = stats.toJson();

      // We can save jsonStats to be analyzed with
      // http://webpack.github.io/analyse or
      // https://github.com/robertknight/webpack-bundle-size-analyzer.
      // var fs = require('fs');
      // fs.writeFileSync('./bundle-stats.json', JSON.stringify(jsonStats));

      var buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

      if (buildError)
        throw new gutil.PluginError('webpack', buildError);

      gutil.log('[webpack]', stats.toString({
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }));

      callback();
    });
  };
};
