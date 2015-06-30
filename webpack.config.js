var path = require('path');
var webpack = require('webpack');

var devtools = process.env.CONTINUOUS_INTEGRATION
  ? 'source-map'
  // cheap-module-eval-source-map, because we want original source, but we don't
  // care about columns, which makes this devtool faster than eval-source-map.
  // http://webpack.github.io/docs/configuration.html#devtool
  : 'cheap-module-eval-source-map';

var config = {

  debug: true,

  devtool: devtools,

  entry: {
    'index.ios': [
      './node_modules/react-native-browser-polyfill/polyfills/globalself.js',
      './node_modules/whatwg-fetch/fetch.js',
      './node_modules/intl/Intl.js',
      './node_modules/intl/locale-data/jsonp/en.js',
      './src/main.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {test: /(\.js$)/, exclude: /node_modules/,  loaders: ['babel?stage=0&blacklist=validation.react']},
      {
        test: /(react-native-side-menu|react-native-icons|react-native-modal|react-native-keyboardevents|react-native-progress-hud)/,
        loaders: ['babel?stage=0&blacklist=validation.react']
      }
    ]
  },

  plugins: [],

  resolve: {
      extensions: ['', '.js', '.json']
  }

};

// Hot loader
if (process.env.HOT) {
  config.devtool = 'eval'; // Speed up incremental builds
  config.entry['index.ios'].unshift('../../hot/entry');
  config.entry['index.ios'].unshift('webpack/hot/only-dev-server');
  config.entry['index.ios'].unshift('webpack-dev-server/client?http://localhost:8082');
  config.output.publicPath = 'http://localhost:8082/';
  config.module.loaders[0].loaders.unshift('react-hot');
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

// Production config
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
