import constants from '../constants';
import Koa from 'koa';
import makeWebpackConfig from '../makeConfig';
import webpack from 'webpack';
import webpackKoa from 'koa-webpack';

const app = new Koa();

const webpackConfig = makeWebpackConfig({ isDevelopment: true });
const compiler = webpack(webpackConfig);
const dev = {
  headers: { 'Access-Control-Allow-Origin': '*' },
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
};

app.use(webpackKoa({ compiler, dev }));

app.listen(constants.HOT_RELOAD_PORT);
