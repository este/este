/* @flow */
import Helmet from 'react-helmet';
import Html from './Html';
import React from 'react';
import config from '../config';
import configureStore from '../../common/configureStore';
import createInitialState from './createInitialState';
import serialize from 'serialize-javascript';
import { Provider as Redux } from 'react-redux';
import { ServerRouter, createServerRenderContext } from 'react-router'
import { queryFirebaseServer } from '../../common/lib/redux-firebase/queryFirebase';
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { toJSON } from '../../common/transit';

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

const renderApp = (store, context, location) => {
  const markup = renderToString(
    <Redux store={store}>
      <ServerRouter
        context={context}
        location={location}
      >
        <App/>
      </ServerRouter>
    </Redux>
  );
  return { markup, helmet: Helmet.rewind() };
};

const render = (req: Object, res: Object, next: Function) => {
  try {
    const context = createServerRenderContext();
    const store = createStore(req);
    let appMarkupWithHelmet = renderApp(store, context, req.url);
    const result = context.getResult();
    if (result.redirect) {
      res.redirect(301, result.redirect.pathname + result.redirect.search);
      return;
    }
    let status = 200;
    if (result.missed) {
      status = 404;
      // TODO: Do not fetch twice somehow.
      appMarkupWithHelmet = renderApp(store, context, req.url);
    }
    // TODO:
    // res.status(status).send(html);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default render;

// const renderScripts = (state, headers, hostname, appJsFilename) =>
//   // https://github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
//   // TODO: Switch to CSP, https://github.com/este/este/pull/731
//   `
//     <script>
//       window.__INITIAL_STATE__ = ${serialize(toJSON(state))};
//     </script>
//     <script src="${appJsFilename}"></script>
//   `;
//
// const renderPage = (store, renderProps, req) => {
//   const state = store.getState();
//   // No server routing for server-less apps.
//   if (process.env.IS_SERVERLESS) {
//     delete state.routing;
//   }
//   const { headers, hostname } = req;
//   const { appHtml, helmet } = renderApp(store, renderProps);
//   const {
//     styles: { app: appCssFilename },
//     javascript: { app: appJsFilename },
//   } = webpackIsomorphicTools.assets();
//   const scriptsHtml = renderScripts(state, headers, hostname, appJsFilename);
//   if (!config.isProduction) {
//     webpackIsomorphicTools.refresh();
//   }
//   const docHtml = ReactDOMServer.renderToStaticMarkup(
//     <Html
//       appCssFilename={appCssFilename}
//       bodyHtml={`<div id="app">${appHtml}</div>${scriptsHtml}`}
//       googleAnalyticsId={config.googleAnalyticsId}
//       helmet={helmet}
//       isProduction={config.isProduction}
//     />
//   );
//   return `<!DOCTYPE html>${docHtml}`;
// };
//
// const render = (req, res, next) => {
//   const memoryHistory = createMemoryHistory(req.originalUrl);
//   const store = configureStore({
//     initialState: createRequestInitialState(req),
//     platformMiddleware: [routerMiddleware(memoryHistory)],
//   });
//   const history = syncHistoryWithStore(memoryHistory, store);
//   const routes = createRoutes(store.getState);
//   const location = req.url;
//
//   match({ history, routes, location }, async (error, redirectLocation, renderProps) => {
//     if (redirectLocation) {
//       res.redirect(301, redirectLocation.pathname + redirectLocation.search);
//       return;
//     }
//     if (error) {
//       next(error);
//       return;
//     }
//     try {
//       if (!process.env.IS_SERVERLESS) {
//         await queryFirebaseServer(() => renderApp(store, renderProps));
//       }
//       const html = renderPage(store, renderProps, req);
//       const status = renderProps.routes
//         .some(route => route.path === '*') ? 404 : 200;
//       res.status(status).send(html);
//     } catch (error) {
//       next(error);
//     }
//   });
// };
//
// export default render;
