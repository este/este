// import favicon from 'serve-favicon';
import compression from 'compression';
import config from '../config';
import device from 'express-device';
import esteMiddleware from '../lib/esteMiddleware';
import express from 'express';
import makeWebpackConfig from '../../../webpack/makeConfig';
import render from './render';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

const app = express();

// TODO: Move to separate server.
if (!config.isProduction) {
  const webpackConfig = makeWebpackConfig(true);
  const compiler = webpack(webpackConfig);
  app.use(webpackDev(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHot(compiler));
}

app.use(esteMiddleware());
app.use(compression());

// app.use(favicon('_assets/img/favicon.ico'));

// Serve the static assets. We can cache them as they include hashes.
app.use('/assets/img', express.static('assets/img', {maxAge: '200d'}));
app.use('/_assets', express.static('build', {maxAge: '200d'}));

// Intl.
app.use('/node_modules/intl/dist', express.static('node_modules/intl/dist'));
app.use('/node_modules/intl/locale-data', express.static('node_modules/intl/locale-data'));

app.use(device.capture());
app.get('*', render);

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath);
});

export default app;
