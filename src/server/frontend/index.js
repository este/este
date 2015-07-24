// import favicon from 'serve-favicon';
import compression from 'compression';
import config from '../config';
import esteHeaders from '../lib/estemiddleware';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import intlMiddleware from '../lib/intlmiddleware';
import render from './render';
import userState from './userstate';
import dataFetching from './initialStateAndFetchData';

const app = express();

// Add Este.js headers for React related routes only.
if (!config.isProduction)
  app.use(esteHeaders());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// TODO: Add favicon.
// app.use(favicon('assets/img/favicon.ico'))
// TODO: Move to CDN.
app.use('/build', express.static('build'));
app.use('/assets', express.static('assets'));

// Load translations, fallback to defaultLocale if no translation is available.
app.use(intlMiddleware({
  defaultLocale: config.defaultLocale
}));

// Load current user if cookie exists.
app.use(userState());

//Load api datas
app.use(dataFetching());

app.get('*', (req, res, next) => {
  render(req, res).catch(next);
});

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath);
});

export default app;
