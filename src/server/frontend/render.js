import * as state from '../../client/state';
import config from '../config';
import DocumentTitle from 'react-document-title';
import Html from './html.react';
import immutable from 'immutable';
import initialState from '../initialstate';
import Location from 'react-router/lib/location';
import NotFound from '../../client/pages/notfound.react';
import Promise from 'bluebird';
import React from 'react';
import Router from 'react-router';
import routes from '../../client/routes';
import stateMerger from '../lib/merger';

export default function render(req, res, ...customStates) {
  const appState = immutable.fromJS(initialState).mergeWith(stateMerger, ...customStates).toJS();
  return renderPage(req, res, appState);
}

function renderPage(req, res, appState) {
  return new Promise((resolve, reject) => {
    const location = new Location(req.path, req.query);
    Router.run(routes, location, (error, initialState, transition) => {
      if (error) console.error('Error!', error);

      const html = loadAppStateThenRenderHtml(<Router {...initialState} />, appState);
      const notFound = initialState.components.some(component => component === NotFound);
      const status = notFound ? 404 : 200;
      res.status(status).send(html);
      resolve();

      // TODO onAbort and onError - how to handle?
      // onError: reject,
      // onAbort: (abortReason) => {
      //   // Some requireAuth higher order component requested redirect.
      //   if (abortReason.constructor.name === 'Redirect') {
      //     const {to, params, query} = abortReason;
      //     const path = router.makePath(to, params, query);
      //     res.redirect(path);
      //     resolve();
      //     return;
      //   }
      //   reject(abortReason);
      // }
    });
  });
}

function loadAppStateThenRenderHtml(appElement, appState) {
  state.appState.load(appState);
  return getPageHtml(appElement, appState);
}

function getPageHtml(appElement, appState) {
  const appHtml = `<div id="app">${React.renderToString(appElement)}</div>`;
  const appScriptSrc = config.isProduction
    ? '/build/app.js?v=' + config.version
    : '//localhost:8888/build/app.js';

  // Serialize app state for client.
  let scriptHtml = `
    <script>
      (function() {
        window._appState = ${JSON.stringify(appState)};
        var app = document.createElement('script'); app.type = 'text/javascript'; app.async = true;
        var src = '${appScriptSrc}';
        // IE<11 and Safari need Intl polyfill.
        if (!window.Intl) src = src.replace('.js', 'intl.js');
        app.src = src;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(app, s);
      })();
    </script>`;

  if (config.isProduction && config.googleAnalyticsId !== 'UA-XXXXXXX-X')
    scriptHtml += `
      <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','${config.googleAnalyticsId}');ga('send','pageview');
      </script>`;

  const title = DocumentTitle.rewind();

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      bodyHtml={appHtml + scriptHtml}
      isProduction={config.isProduction}
      title={title}
      version={config.version}
    />
  );
}
