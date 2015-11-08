const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const makeWebpackConfig = require('../makeConfig');
const express = require('express');

const app = express();

const webpackConfig = makeWebpackConfig(true);
const compiler = webpack(webpackConfig);

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHot(compiler));

app.listen(webpackConfig.hotPort, () => {
  console.log('Hot server started at port %s', webpackConfig.hotPort); // eslint-disable-line no-console
});
