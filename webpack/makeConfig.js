/* @flow weak */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import autoprefixer from 'autoprefixer';
import config from '../src/server/config';
import constants from './constants';
import ip from 'ip';
import path from 'path';
import webpack from 'webpack';
import webpackIsomorphicAssets from './assets';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicAssets);

// github.com/facebookincubator/create-react-app/issues/343#issuecomment-237241875
// You may want 'cheap-module-source-map' instead if you prefer source maps.
const devtools = 'eval';

const loaders = {
  css: '',
};

const serverIp = config.remoteHotReload
  ? ip.address() // Dynamic IP address enables hot reload on remote devices.
  : 'localhost';

const makeConfig = (options) => {
  const {
    isDevelopment,
  } = options;

  const stylesLoaders = Object.keys(loaders).map((ext) => {
    const prefix = 'css-loader!postcss-loader';
    const extLoaders = prefix + loaders[ext];
    const loader = isDevelopment
      ? `style-loader!${extLoaders}`
      : ExtractTextPlugin.extract('style-loader', extLoaders);
    return {
      loader,
      test: new RegExp(`\\.(${ext})$`),
    };
  });

  const config = {
    hotPort: constants.HOT_RELOAD_PORT,
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',
    entry: {
      app: isDevelopment ? [
        `webpack-hot-middleware/client?path=http://${serverIp}:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
        path.join(constants.SRC_DIR, 'browser/index.js'),
      ] : [
        path.join(constants.SRC_DIR, 'browser/index.js'),
      ],
    },
    module: {
      noParse: [
        // https://github.com/localForage/localForage/issues/617
        new RegExp('localforage.js'),
      ],
      loaders: [
        {
          loader: 'url-loader?limit=10000',
          test: /\.(gif|jpg|png|svg)(\?.*)?$/,
        }, {
          loader: 'url-loader?limit=1',
          test: /favicon\.ico$/,
        }, {
          loader: 'url-loader?limit=100000',
          test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
        }, {
          test: /\.js$/,
          exclude: constants.NODE_MODULES_DIR,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react', 'stage-1'],
            plugins: [
              ['transform-runtime', {
                helpers: false,
                polyfill: false,
                regenerator: false,
              }],
            ],
            env: {
              production: {
                plugins: [
                  'transform-react-constant-elements',
                ],
              },
            },
          },
        },
        ...stylesLoaders,
      ],
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`,
    } : {
      path: constants.BUILD_DIR,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/assets/',
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            IS_BROWSER: true, // Because webpack is used only for browser code.
            IS_SERVERLESS: JSON.stringify(process.env.IS_SERVERLESS || false),
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
          },
        }),
      ];
      if (isDevelopment) {
        plugins.push(
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
          webpackIsomorphicToolsPlugin.development(),
        );
      } else {
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app-[hash].css', {
            allChunks: true,
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              screw_ie8: true, // eslint-disable-line camelcase
              warnings: false, // Because uglify reports irrelevant warnings.
            },
          }),
          new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
          }),
          webpackIsomorphicToolsPlugin,
          new CopyWebpackPlugin([{
            from: './src/common/app/favicons/',
            to: 'favicons',
          }], {
            ignore: ['original/**'],
          }),
        );
      }
      return plugins;
    })(),
    postcss: () => [autoprefixer({ browsers: 'last 2 version' })],
    resolve: {
      extensions: ['', '.js'], // .json is ommited to ignore ./firebase.json
      modulesDirectories: ['src', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        react$: require.resolve(path.join(constants.NODE_MODULES_DIR, 'react')),
      },
    },
  };

  return config;
};

export default makeConfig;
