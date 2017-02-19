// @flow
import App from '../../browser/app/App';
import Helmet from 'react-helmet';
import Html from './Html';
import React from 'react';
import ServerFetchProvider from './ServerFetchProvider';
import config from '../config';
import configureFela from '../../browser/configureFela';
import configureStore from '../../common/configureStore';
import createUserFirebase from '../../common/users/createUserFirebase';
import createInitialState from './createInitialState';
import serialize from 'serialize-javascript';
import { BrowserRoot } from '../../browser/app/Root';
import { createServerRenderContext, ServerRouter } from 'react-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';


// TODO: move to ./createFirebaseConnection.js
import firebaseAdmin from 'firebase-admin';
import firebaseServiceAccount from '../../../../este-b1107-firebase-adminsdk-0e0p2-50e1061635.json';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
  databaseURL: config.firebase.databaseURL,
});

const firebaseAuth = firebaseAdmin.auth();

const settleAllWithTimeout = promises => Promise
  .all(promises.map(p => p.reflect()))
  // $FlowFixMe
  .each((inspection) => {
    if (inspection.isFulfilled()) return;
    console.log('Server fetch failed:', inspection.reason());
  })
  .timeout(15000) // Do not block rendering forever.
  .catch((error) => {
    // $FlowFixMe
    if (error instanceof Promise.TimeoutError) {
      console.log('Server fetch timed out:', error);
      return;
    }
    throw error;
  });

// createInitialState loads files, so it must be called once.
const initialState = createInitialState();

const getHost = req =>
  `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`;

const getAuthToken = req =>
  process.env.IS_SERVERLESS
    ? false // No SSR, no auth token
    : (req.cookies && req.cookies.auth)
      || false;

const getTheme = req =>
  process.env.IS_SERVERLESS
    ? config.defaultTheme // No SSR, use default theme
    : (req.cookies && req.cookies.theme) // User set language explicitly in app
      || config.defaultTheme; // No preference, use default theme

const getLocale = req =>
  process.env.IS_SERVERLESS
    ? config.defaultLocale // No SSR, use default locale
    : (req.cookies && req.cookies.locale) // User set language explicitly in app
      || req.acceptsLanguages(config.locales) // Browser specified language
      || config.defaultLocale; // No preference, use default locale

// TODO: make this async, make createStore async
// Lookup firebase user
// Change firebase config
// Download security json
// Server-side firebase calls (as user, not admin)
const getUser = req => {
  const jwtToken = getAuthToken(req);
  console.log(jwtToken);
  if (!jwtToken) {
    return;
  }

  firebaseAuth.verifyIdToken(jwtToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      // TODO
      // const firebaseUser = firebaseAuth.fakeLookupFunction(uid);
      // const user = createUserFirebase(firebaseUser);
      console.log(decodedToken, uid, decodedToken.firebase.identities);
      /*
        token { iss: 'https://securetoken.google.com/este-b1107',
          aud: 'este-b1107',
          auth_time: 1487292563,
          user_id: 'M7PDKFEkLOeEFBsgkRAnN1AoOvj1',
          sub: 'M7PDKFEkLOeEFBsgkRAnN1AoOvj1',
          iat: 1487292563,
          exp: 1487296163,
          email: 'cavitt.glover@gmail.com',
          email_verified: false,
          firebase:
           { identities: { email: [Object] },
             sign_in_provider: 'password' },
          uid: 'M7PDKFEkLOeEFBsgkRAnN1AoOvj1' } M7PDKFEkLOeEFBsgkRAnN1AoOvj1
      */
    }).catch((error) => {
      // Handle error
    });
}

// TODO: make async
const createStore = req => {
  getUser(req);
  return configureStore({
    initialState: {
      ...initialState,
      app: {
        currentTheme: getTheme(req),
      },
      device: {
        ...initialState.device,
        host: getHost(req),
      },
      intl: {
        ...initialState.intl,
        currentLocale: getLocale(req),
        initialNow: Date.now(),
      },
      users: {
        // viewer: getUser(req),
        // TODO: online: ,
      },
    },
  });
}

const renderBody = (store, context, location, fetchPromises) => {
  const felaRenderer = configureFela();
  const html = renderToString(
    <BrowserRoot felaRenderer={felaRenderer} store={store}>
      <ServerFetchProvider promises={fetchPromises}>
        <ServerRouter context={context} location={location}>
          <App />
        </ServerRouter>
      </ServerFetchProvider>
    </BrowserRoot>,
  );
  const helmet = Helmet.rewind();
  const css = felaRenderer.renderToString();
  return { html, helmet, css };
};

const renderScripts = (state, appJsFilename) =>
  // github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  // TODO: Switch to CSP, https://github.com/este/este/pull/731
  `
    <script>
      window.__INITIAL_STATE__ = ${serialize(state)};
    </script>
    <script src="${appJsFilename}"></script>
  `;

const renderHtml = (state, body) => {
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename },
  } = global.webpackIsomorphicTools.assets();
  if (!config.isProduction) {
    global.webpackIsomorphicTools.refresh();
  }
  const scripts = renderScripts(state, appJsFilename);
  const html = renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      bodyCss={body.css}
      bodyHtml={`<div id="app">${body.html}</div>${scripts}`}
      googleAnalyticsId={config.googleAnalyticsId}
      helmet={body.helmet}
      isProduction={config.isProduction}
    />,
  );
  return `<!DOCTYPE html>${html}`;
};

// react-router.now.sh/ServerRouter
const localeList = config.locales.join(', ');
const render = async (req: Object, res: Object, next: Function) => {
  try {
    const context = createServerRenderContext();
    const store = createStore(req);
    const fetchPromises = [];

    let body = renderBody(store, context, req.url, fetchPromises);
    const result = context.getResult();

    res.header('Content-Language', localeList);

    if (result.redirect) {
      res.redirect(301, result.redirect.pathname + result.redirect.search);
      return;
    }

    if (result.missed) {
      body = renderBody(store, context, req.url);
      const html = renderHtml(store.getState(), body);
      res.status(404).send(html);
      return;
    }

    if (!process.env.IS_SERVERLESS && fetchPromises.length > 0) {
      await settleAllWithTimeout(fetchPromises);
      body = renderBody(store, context, req.url);
    }

    const html = renderHtml(store.getState(), body);
    res.status(200).send(html);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default render;
