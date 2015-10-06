// import favicon from 'serve-favicon';
import compression from 'compression';
import device from 'express-device';
import esteMiddleware from '../lib/esteMiddleware';
import express from 'express';
import {logServer} from '../lib/logger';
import render from './render';

const app = express();

app.use(esteMiddleware());
app.use(compression());

// app.use(favicon('../assets/img/favicon.ico'));

// Serve the static assets. We can cache them as they include hashes.
app.use('/assets/img', express.static('../assets/img', {maxAge: '200d'}));
app.use('/_assets', express.static('build', {maxAge: '200d'}));

// Intl.
app.use('/node_modules/intl/dist', express.static('node_modules/intl/dist'));
app.use('/node_modules/intl/locale-data', express.static('node_modules/intl/locale-data'));

app.use(device.capture());
app.get('*', render);

app.on('mount', () => {
  logServer(`App is available at ${app.mountpath}`);
});

export default app;
