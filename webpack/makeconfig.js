/* @flow weak */

"use strict"

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var NotifyPlugin = require('./notifyplugin')
var path = require('path')
var webpack = require('webpack')

var loaders = {
  'css': 'css-loader',
  'less': 'css-loader!less-loader',
  'scss|sass': 'css-loader!sass-loader',
  'styl': 'css-loader!stylus-loader'
}

module.exports = function(isDevelopment) {

  function stylesLoaders() {
    return Object.keys(loaders).map(function(ext) {
      var loader = isDevelopment ? 'style-loader!' + loaders[ext] :
        ExtractTextPlugin.extract('style-loader', loaders[ext])
      return {
        loader: loader,
        test: new RegExp('\\.(' + ext + ')$')
      }
    })
  }

  var config = {
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? 'eval-source-map' : '',
    entry: {
      app: isDevelopment ? [
        'webpack-dev-server/client?http://localhost:8888',
        // Why only-dev-server instead of dev-server:
        // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
        'webpack/hot/only-dev-server',
        './src/client/main.js'
      ] : [
        './src/client/main.js'
      ],
      // For Safari, IE<11, and some old browsers. More languages will need more
      // specific builds.
      appintl: isDevelopment ? [
        'webpack-dev-server/client?http://localhost:8888',
        // Why only-dev-server instead of dev-server:
        // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
        'webpack/hot/only-dev-server',
        './node_modules/intl/Intl.js',
        './node_modules/intl/locale-data/jsonp/en.js',
        './src/client/main.js'
      ] : [
        './node_modules/intl/Intl.js',
        './node_modules/intl/locale-data/jsonp/en.js',
        './src/client/main.js'
      ]
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loaders: isDevelopment ? [
          'react-hot', 'babel-loader'
        ] : [
          'babel-loader'
        ],
        test: /\.jsx?$/
      }].concat(stylesLoaders())
    },
    output: isDevelopment ? {
      path: path.join(__dirname, '/build/'),
      filename: '[name].js',
      publicPath: 'http://localhost:8888/build/'
    } : {
      path: 'build/',
      filename: '[name].js'
    },
    plugins: (function() {
      var plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        })
      ]
      if (isDevelopment)
        plugins.push(
          NotifyPlugin,
          new webpack.HotModuleReplacementPlugin(),
          // Tell reloader to not reload if there is an error.
          new webpack.NoErrorsPlugin()
        )
      else
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app.css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        )
      return plugins
    })(),
    resolve: {
      // To allow require('file') instead of require('file.jsx')
      extensions: ['', '.js', '.jsx', '.json']
    },
  }

  return config

}
