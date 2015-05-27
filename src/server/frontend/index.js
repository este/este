import compression from 'compression';
import express from 'express';
// import favicon from 'serve-favicon';
import render from './render';

const app = express();

app.use(compression());
// TODO: Add favicon.
// app.use(favicon('assets/img/favicon.ico'))
// TODO: Move to CDN.
app.use('/build', express.static('build'));
app.use('/assets', express.static('assets'));

app.get('*', (req, res, next) => {
  render(req, res).catch(next);
});

app.on('mount', () => {
  console.log('Este.js app is now available at path %s', app.mountpath);
});

export default app;
