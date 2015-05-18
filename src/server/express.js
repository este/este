/*eslint-disable no-console */

import compression from 'compression';
import config from './config';
import express from 'express';
// import favicon from 'serve-favicon';
import render from './render';

export default function() {

  const app = express();

  app.use(compression());
  // TODO: Add favicon.
  // app.use(favicon('assets/img/favicon.ico'))
  // TODO: Move to CDN.
  app.use('/build', express.static('build'));
  app.use('/assets', express.static('assets'));

  app.get('*', (req, res) => {
    const acceptsLanguages = req.acceptsLanguages(config.appLocales);
    const userState = {
      i18n: {
        locales: acceptsLanguages || config.defaultLocale
      }
    };
    render(req, res, userState)
      .catch((error) => {
        const msg = error.stack || error;
        console.log(msg);
        res.status(500).send('500: ' + msg);
      });
  });

  app.listen(config.port);

  console.log(`App started on port ${config.port}`);

}
