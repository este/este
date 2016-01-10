import compression from 'compression';
import device from 'express-device';
import esteMiddleware from '../lib/esteMiddleware';
import express from 'express';
// import favicon from 'serve-favicon';
import render from './render';

const app = express();

app.use(esteMiddleware());
app.use(compression());

// app.use(favicon('assets/img/favicon.ico'));

// Serve the static assets. We can cache them as they include hashes.
// express.static is relative to the directory where you launch your node process
app.use('/assets/img', express.static('assets/img', {maxAge: '200d'}));
app.use('/_assets', express.static('build', {maxAge: '200d'}));

app.use(device.capture());
app.get('*', render);

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath);
});

export default app;
