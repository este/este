import compression from 'compression';
import config from '../config';
import esteHeaders from '../lib/estemiddleware';
import express from 'express';
// import favicon from 'serve-favicon';
import render from './render';

const app = express();

// Add Este.js headers for React related routes only
if (!config.isProduction)
  app.use(esteHeaders());

app.use(compression());
// TODO: Add favicon.
// app.use(favicon('assets/img/favicon.ico'))
// TODO: Move to CDN.
app.use('/build', express.static('build'));
app.use('/assets', express.static('assets'));

// Example how initialState, which is the same for all users, is enriched with
// user state. With state-less Flux, we don't need instances.
app.use(function(req, res, next) {

  const acceptsLanguages = req.acceptsLanguages(config.appLocales);

  req.userState = {
    i18n: {
      locales: acceptsLanguages || config.defaultLocale
    },
    todos: {
      list: [
        {id: 2, title: 'relax'}
      ]
    }
  };

  // Simulate async loading from DB.
  setTimeout(() => {
    next();
  }, 20);

});

app.get('*', (req, res, next) => {
  render(req, res, req.userState).catch(next);
});

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath);
});

export default app;
