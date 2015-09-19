// TODO: Split to files.
import DocumentTitle from 'react-document-title';
import Html from './html.react';
import Promise from 'bluebird';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from '../config';
import {configureStore} from '@este/common';
import createLocation from 'history/lib/createLocation';
import createRoutes from '../../client/createRoutes';
import immutable from 'immutable';
import initialState from '../initialState';
import stateMerger from '../lib/merger';
import useragent from 'useragent';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import {RoutingContext, match} from 'react-router';

export default function render(req, res, userState) {
  const appState = immutable.fromJS(initialState)
    .mergeWith(stateMerger, userState).toJS();
  return renderPage(req, res, appState);
}

function renderPage(req, res, appState) {
  return new Promise((resolve, reject) => {

    const routes = createRoutes(() => appState);
    const location = createLocation(req.url);

    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        resolve();
      } else if (error) {
        // res.send(500, error.message)
        reject(error);
      } else if (renderProps == null) {
        // TODO: Redirect to page we already have.
        res.send(404, 'Not found');
        resolve();
      } else {
        // console.log(renderProps)
        // TODO: Extract method.
        const ua = useragent.is(req.headers['user-agent']);
        const html = getPageHtml(renderProps, appState, {
          hostname: req.hostname,
          // TODO: Remove once Safari and IE without Intl will die.
          needIntlPolyfill: ua.safari || (ua.ie && ua.version < '11')
        });

        res.send(html);
      }
    });
  });
}

// function renderPage(req, res, appState) {
//   return new Promise((resolve, reject) => {

//     const router = Router.create({
//       routes,
//       location: req.originalUrl,
//       onError: reject,
//       onAbort: (abortReason) => {
//         // Some requireAuth higher order component requested redirect.
//         if (abortReason.constructor.name === 'Redirect') {
//           const {to, params, query} = abortReason;
//           const path = router.makePath(to, params, query);
//           res.redirect(path);
//           resolve();
//           return;
//         }
//         reject(abortReason);
//       }
//     });

//     router.run((Handler, routerState) => {
//       const ua = useragent.is(req.headers['user-agent']);
//       const html = getPageHtml(Handler, appState, {
//         hostname: req.hostname,
//         // TODO: Remove once Safari and IE without Intl will die.
//         needIntlPolyfill: ua.safari || (ua.ie && ua.version < '11')
//       });
//       const notFound = routerState.routes.some(route => route.name === 'not-found');
//       const status = notFound ? 404 : 200;
//       res.status(status).send(html);
//       resolve();
//     });

//   });
// }

function getPageHtml(renderProps, appState, {hostname, needIntlPolyfill}) {
  // TODO: Refactor body html pridavat, lepsi. A komponentu do stringu!
  const store = configureStore(appState);

  const appHtml = `<div id="app">${
    ReactDOMServer.renderToString(
      <Provider store={store}>
        <IntlProvider>
          <RoutingContext {...renderProps} />
        </IntlProvider>
      </Provider>
    )
  }</div>`;

  const appScriptSrc = config.isProduction
    ? '/_assets/app.js?' + config.assetsHashes.appJs
    : `//${hostname}:8000/build/app.js`;

  let scriptHtml = '';

  if (needIntlPolyfill) {
    scriptHtml += `
    <script src="/node_modules/intl/dist/Intl.min.js"></script>
    <script src="/node_modules/intl/locale-data/jsonp/en-US.js"></script>`;
  }

  scriptHtml += `
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(appState)};
    </script>
    <script src="${appScriptSrc}"></script>
  `;

  const title = DocumentTitle.rewind();

  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
    <Html
      appCssHash={config.assetsHashes.appCss}
      bodyHtml={appHtml + scriptHtml}
      googleAnalyticsId={config.googleAnalyticsId}
      isProduction={config.isProduction}
      title={title}
    />
  );
}
