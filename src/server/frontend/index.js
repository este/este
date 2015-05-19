import compression from 'compression';
import config from '../config';
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
  const acceptsLanguages = req.acceptsLanguages(config.appLocales);
  render(req, res, acceptsLanguages || config.defaultLocale)
    .catch(next);
});

app.on('mount', () => {
  console.log('Client app listening at %s', app.mountpath);
});

export default app;
