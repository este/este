import DocumentTitle from 'react-document-title';
import Html from './html.react';
import Immutable from 'immutable';
import Promise from 'bluebird';
import React from 'react';
import Router from 'react-router';
import config from '../config';
import initialState from '../initialstate';
import routes from '../../client/routes';
import {state} from '../../client/state';

export default function render(req, res) {
  return loadUserState(req)
    .then((appState) => {
      return renderPage(req, res, appState);
    });
}

// Example how initialState, which is the same for all users, is enriched with
// user state. With state-less Flux, we don't need instances.
function loadUserState(req) {
  return new Promise((resolve, reject) => {

    const acceptsLanguages = req.acceptsLanguages(config.appLocales);
    const userState = {
      i18n: {
        locales: acceptsLanguages || config.defaultLocale
      }
    };
    const appState = Immutable.fromJS(initialState).mergeDeep(userState).toJS();

    // Simulate async loading from DB.
    setTimeout(() => {
      resolve(appState);
    }, 20);
  });
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
      const html = preloadAppStateThenRenderHtml(Handler, appState);
      const notFound = routerState.routes.some(route => route.name === 'not-found');
      const status = notFound ? 404 : 200;
      res.status(status).send(html);
      resolve();
    });

  });
}

function preloadAppStateThenRenderHtml(Handler, appState) {
  // Load app state for server rendering.
  state.load(appState);
  return getPageHtml(Handler, appState);
}

function getPageHtml(Handler, appState) {
  const appHtml = `<div id="app">${React.renderToString(<Handler />)}</div>`;
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
