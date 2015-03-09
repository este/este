import DocumentTitle from 'react-document-title'
import Html from './html'
import Promise from 'bluebird'
import React from 'react'
import Router from 'react-router'
import config from './config'
import messages from '../client/messages'
import routes from '../client/routes'
import {state} from '../client/state'

export default function(path, locale) {
  return loadData(path, locale).then(renderPage)
}

// TODO: Preload app state from DB or whatever.
function loadData(path, locale) {
  return new Promise((resolve, reject) => {
    resolve({
      path,
      appState: {
        i18n: {
          formats: {},
          locales: locale,
          messages: messages[locale]
        },
        newTodo: { title: '' },
        todos: [
          {id: 1, title: 'consider ‘stop doing’ app'},
          {id: 2, title: 'relax'}
        ],
        user: {}
      }
    })
  })
}

function renderPage({path, appState}) {
  return new Promise((resolve, reject) => {
    Router.run(routes, path, (Handler, routerState) => {
      state.load(appState)
      let html = getPageHtml(Handler, appState)
      let isNotFound = routerState.routes.some(route => route.name == 'not-found')
      resolve({
        html: html,
        status: isNotFound ? 404: 200
      })
    })
  })
}

function getPageHtml(Handler, appState) {
  let appHtml = React.renderToString(<Handler {...appState.i18n} />)
  let appScriptSrc = config.isProduction
    ? '/build/app.js?v=' + config.version
    : '//localhost:8888/build/app.js'
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
    </script>`

  const gaid = config.googleAnalyticsId;
  if (gaid !== 'UA-XXXXXXX-X') {
    scriptHtml += `
      <!-- Google Analytics -->
      <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','${gaid}');ga('send','pageview');
      </script>`
  }
  let title = DocumentTitle.rewind()

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      bodyHtml={appHtml + scriptHtml}
      isProduction={config.isProduction}
      title={title}
      version={config.version}
    />
  )
}
