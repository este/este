import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import makeWebpackConfig from '../makeConfig';
import constants from '../constants';
import express from 'express';

const app = express();

const webpackConfig = makeWebpackConfig({ isDevelopment: true });
const compiler = webpack(webpackConfig);

app.use(
  webpackDev(compiler, {
    headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }),
);

app.use(webpackHot(compiler));

app.listen(constants.HOT_RELOAD_PORT);
