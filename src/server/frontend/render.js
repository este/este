import DocumentTitle from 'react-document-title';
import Html from './html.react';
import Promise from 'bluebird';
import React from 'react';
import Router from 'react-router';
import config from '../config';
import immutable from 'immutable';
import initialState from '../initialstate';
import routes from '../../client/routes';
import stateMerger from '../lib/merger';
import useragent from 'useragent';

export default function render(req, res, userState) {
  const appState = immutable
    .fromJS(initialState)
    .mergeWith(stateMerger, userState).toJS();
  return renderPage(req, res, appState);
}

function renderPage(req, res, appState) {
  return new Promise((resolve, reject) => {

    const router = Router.create({
      routes,
      location: req.originalUrl,
      onError: reject,
      onAbort: (abortReason) => {
        // Some requireAuth higher order component requested redirect.
        if (abortReason.constructor.name === 'Redirect') {
          const {to, params, query} = abortReason;
          const path = router.makePath(to, params, query);
          res.redirect(path);
          resolve();
          return;
        }
        reject(abortReason);
      }
    });

    router.run((Handler, routerState) => {
      const ua = useragent.is(req.headers['user-agent']);
      const html = getPageHtml(Handler, appState, {
        hostname: req.hostname,
        // TODO: Remove once Safari and IE without Intl will die.
        needIntlPolyfill: ua.safari || (ua.ie && ua.version < '11')
      });
      const notFound = routerState.routes.some(route => route.name === 'not-found');
      const status = notFound ? 404 : 200;
      res.status(status).send(html);
      resolve();
    });

  });
}

function getPageHtml(Handler, appState, {hostname, needIntlPolyfill}) {
  const appHtml = `<div id="app">${
    React.renderToString(<Handler initialState={appState} />)
  }</div>`;

  const appScriptSrc = config.isProduction
    ? '/_assets/app.js?' + config.assetsHashes.appJs
    : `//${hostname}:8888/build/app.js`;

  let scriptHtml = '';

  if (needIntlPolyfill) {
    scriptHtml += `
    <script src="/node_modules/intl/dist/Intl.min.js"></script>
    <script src="/node_modules/intl/locale-data/jsonp/en-US.js"></script>`;
  }

  scriptHtml += `
    <script>
      window._initialState = ${JSON.stringify(appState)};
    </script>
    <script src="${appScriptSrc}"></script>
  `;

  const title = DocumentTitle.rewind();

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      appCssHash={config.assetsHashes.appCss}
      bodyHtml={appHtml + scriptHtml}
      googleAnalyticsId={config.googleAnalyticsId}
      isProduction={config.isProduction}
      title={title}
    />
  );
}
