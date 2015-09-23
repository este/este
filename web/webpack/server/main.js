import express from 'express';
import makeWebpackConfig from '../makeConfig';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import {logWebpack} from '../../src/server/lib/logger';

const app = express();

const webpackConfig = makeWebpackConfig(true);
const compiler = webpack(webpackConfig);

app.use(webpackDev(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHot(compiler));

app.listen(webpackConfig.hotPort, () => {
  logWebpack(`Hot server started at port ${webpackConfig.hotPort}`); // eslint-disable-line no-console
});
