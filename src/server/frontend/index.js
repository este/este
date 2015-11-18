import compression from 'compression';
import device from 'express-device';
import esteMiddleware from '../lib/esteMiddleware';
import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon';
import render from './render';

const app = express();

app.use(esteMiddleware());
app.use(compression());

// app.use(favicon('assets/img/favicon.ico'));

// the project's root directory for path resolution.
const basePath = path.join(__dirname, '../../..');
const assetsDir = path.join(basePath, 'assets');

// Serve the static assets. We can cache them as they include hashes.
app.use('/assets/img', express.static(path.join(assetsDir, 'img'), {maxAge: '200d'}));
app.use('/_assets', express.static(path.join(basePath, 'build'), {maxAge: '200d'}));

// Intl.
app.use('/node_modules/intl/dist', express.static('node_modules/intl/dist'));
app.use('/node_modules/intl/locale-data', express.static('node_modules/intl/locale-data'));

app.use(device.capture());
app.get('*', render);

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath);
});

export default app;
