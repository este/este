'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');
var NotifyPlugin = require('./notifyplugin');
var constants = require('./constants');
var path = require('path');
var webpack = require('webpack');

var devtools = process.env.CONTINUOUS_INTEGRATION
  ? 'inline-source-map'
  // cheap-module-eval-source-map, because we want original source, but we don't
  // care about columns, which makes this devtool faster than eval-source-map.
  // http://webpack.github.io/docs/configuration.html#devtool
  : 'cheap-module-eval-source-map';

var loaders = {
  'css': '',
  'less': '!less-loader',
  'scss|sass': '!sass-loader',
  'styl': '!stylus-loader'
};

module.exports = function(isDevelopment) {

  function stylesLoaders() {
    return Object.keys(loaders).map(function(ext) {
      var prefix = 'css-loader!autoprefixer-loader?browsers=last 2 version';
      var extLoaders = prefix + loaders[ext];
      var loader = isDevelopment
        ? 'style-loader!' + extLoaders
        : ExtractTextPlugin.extract('style-loader', extLoaders);
      return {
        loader: loader,
        test: new RegExp('\\.(' + ext + ')$')
      };
    });
  }

  var config = {
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',
    entry: {
      app: isDevelopment ? [
        'webpack-dev-server/client?http://localhost:8888',
        // Why only-dev-server instead of dev-server:
        // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
        'webpack/hot/only-dev-server',
        path.join(constants.SRC_DIR, 'client/main.js')
      ] : [
        path.join(constants.SRC_DIR, 'client/main.js')
      ]
    },
    module: {
      loaders: [{
        loader: 'url-loader?limit=100000',
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
      }, {
        exclude: /node_modules/,
        loaders: isDevelopment ? [
          'react-hot', 'babel-loader'
        ] : [
          'babel-loader'
        ],
        test: /\.js$/
      }].concat(stylesLoaders())
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: 'http://localhost:8888/build/'
    } : {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js'
    },
    plugins: (function() {
      var plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        })
      ];
      if (isDevelopment) plugins.push(
        NotifyPlugin,
        new webpack.HotModuleReplacementPlugin(),
        // Tell reloader to not reload if there is an error.
        new webpack.NoErrorsPlugin()
      );
      else plugins.push(
        // Render styles into separate cacheable file to prevent FOUC and
        // optimize for critical rendering path.
        new ExtractTextPlugin('app.css', {
          allChunks: true
        }),
        new NyanProgressPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          // keep_fnames prevents function name mangling.
          // Function names are useful. Seeing a readable error stack while
          // being able to programmatically analyse it is priceless. And yes,
          // we don't need infamous FLUX_ACTION_CONSTANTS with function name.
          // It's ES6 standard polyfilled by Babel.
          /* eslint-disable camelcase */
          compress: {
            keep_fnames: true,
            screw_ie8: true,
            warnings: false // Because uglify reports irrelevant warnings.
          },
          mangle: {
            keep_fnames: true
          }
          /* eslint-enable camelcase */
        })
      );
      return plugins;
    })(),
    resolve: {
      extensions: ['', '.js', '.json'],
      modulesDirectories: ['src', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        'react$': require.resolve(path.join(constants.NODE_MODULES_DIR, 'react'))
      }
    }
  };

  return config;

};
