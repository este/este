/* @flow */
import App from '../../browser/app/App';
import Helmet from 'react-helmet';
import Html from './Html';
import React from 'react';
import config from '../config';
import configureStore from '../../common/configureStore';
import createInitialState from './createInitialState';
import serialize from 'serialize-javascript';
import { Provider as Redux } from 'react-redux';
import { createServerRenderContext, ServerRouter } from 'react-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { toJSON } from '../../common/transit';

// TODO: Redesign queryFirebaseServer.
// import { queryFirebaseServer } from '../../common/lib/redux-firebase/queryFirebase';
// if (!process.env.IS_SERVERLESS) {
//    await queryFirebaseServer(() => renderApp(store, renderProps));
//  }

const initialState = createInitialState();

const getHost = req =>
  `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`;

const getLocale = req => process.env.IS_SERVERLESS
  ? config.defaultLocale
  : req.acceptsLanguages(config.locales) || config.defaultLocale;

const createStore = (req) => configureStore({
  initialState: {
    ...initialState,
    device: initialState.device
      .set('host', getHost(req)),
    intl: initialState.intl
      .set('currentLocale', getLocale(req))
      .set('initialNow', Date.now()),
  },
});

const renderBody = (store, context, location) => {
  const markup = renderToString(
    <Redux store={store}>
      <ServerRouter
        context={context}
        location={location}
      >
        <App />
      </ServerRouter>
    </Redux>
  );
  return { markup, helmet: Helmet.rewind() };
};

const renderScripts = (state, appJsFilename) =>
  // https://github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  // TODO: Switch to CSP, https://github.com/este/este/pull/731
  `
    <script>
      window.__INITIAL_STATE__ = ${serialize(toJSON(state))};
    </script>
    <script src="${appJsFilename}"></script>
  `;

const renderHtml = (state, bodyMarkupWithHelmet) => {
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename },
  } = global.webpackIsomorphicTools.assets();
  if (!config.isProduction) {
    global.webpackIsomorphicTools.refresh();
  }
  const { markup: bodyMarkup, helmet } = bodyMarkupWithHelmet;
  const scriptsMarkup = renderScripts(state, appJsFilename);
  const markup = renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      bodyHtml={`<div id="app">${bodyMarkup}</div>${scriptsMarkup}`}
      googleAnalyticsId={config.googleAnalyticsId}
      helmet={helmet}
      isProduction={config.isProduction}
    />
  );
  return `<!DOCTYPE html>${markup}`;
};

const render = (req: Object, res: Object, next: Function) => {
  try {
    const context = createServerRenderContext();
    const store = createStore(req);
    let bodyMarkupWithHelmet = renderBody(store, context, req.url);
    const result = context.getResult();
    if (result.redirect) {
      res.redirect(301, result.redirect.pathname + result.redirect.search);
      return;
    }
    let status = 200;
    if (result.missed) {
      status = 404;
      bodyMarkupWithHelmet = renderBody(store, context, req.url);
    }
    const htmlMarkup = renderHtml(store.getState(), bodyMarkupWithHelmet);
    res.status(status).send(htmlMarkup);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default render;
