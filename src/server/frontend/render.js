import Helmet from 'react-helmet';
import Html from './Html';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from '../config';
import configureStore from '../../common/configureStore';
import createInitialState from './createInitialState';
import createRoutes from '../../browser/createRoutes';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { queryFirebaseServer } from '../../common/lib/redux-firebase/queryFirebase';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { toJSON } from '../../common/transit';

const initialState = createInitialState();

const createRequestInitialState = req => {
  const currentLocale = process.env.IS_SERVERLESS
    ? config.defaultLocale
    : req.acceptsLanguages(config.locales) || config.defaultLocale;
  const host =
    `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`;
  return {
    ...initialState,
    intl: initialState.intl
      .set('currentLocale', currentLocale)
      .set('initialNow', Date.now()),
    device: initialState.device
      .set('host', host),
  };
};

const renderApp = (store, renderProps) => {
  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
  return { appHtml, helmet: Helmet.rewind() };
};

const renderScripts = (state, headers, hostname, appJsFilename) =>
  // https://github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  // TODO: Switch to CSP, https://github.com/este/este/pull/731
  `
    <script>
      window.__INITIAL_STATE__ = ${serialize(toJSON(state))};
    </script>
    <script src="${appJsFilename}"></script>
  `;

const renderPage = (store, renderProps, req) => {
  const state = store.getState();
  // No server routing for server-less apps.
  if (process.env.IS_SERVERLESS) {
    delete state.routing;
  }
  const { headers, hostname } = req;
  const { appHtml, helmet } = renderApp(store, renderProps);
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename },
  } = webpackIsomorphicTools.assets();
  const scriptsHtml = renderScripts(state, headers, hostname, appJsFilename);
  if (!config.isProduction) {
    webpackIsomorphicTools.refresh();
  }
  const docHtml = ReactDOMServer.renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      bodyHtml={`<div id="app">${appHtml}</div>${scriptsHtml}`}
      googleAnalyticsId={config.googleAnalyticsId}
      helmet={helmet}
      isProduction={config.isProduction}
    />
  );
  return `<!DOCTYPE html>${docHtml}`;
};

const render = (req, res, next) => {
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore({
    initialState: createRequestInitialState(req),
    platformMiddleware: [routerMiddleware(memoryHistory)],
  });
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store.getState);
  const location = req.url;

  match({ history, routes, location }, async (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      return;
    }
    if (error) {
      next(error);
      return;
    }
    try {
      if (!process.env.IS_SERVERLESS) {
        await queryFirebaseServer(() => renderApp(store, renderProps));
      }
      const html = renderPage(store, renderProps, req);
      const status = renderProps.routes
        .some(route => route.path === '*') ? 404 : 200;
      res.status(status).send(html);
    } catch (error) {
      next(error);
    }
  });
};

export default render;
