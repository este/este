// TODO: Refactor to files.
import DocumentTitle from 'react-document-title';
import Html from './html.react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from '../config';
import createLocation from 'history/lib/createLocation';
import createRoutes from '../../client/createRoutes';
import initialState from '../initialState';
import useragent from 'useragent';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import {RoutingContext, match} from 'react-router';
import {configureStore} from '@este/common';
import {fromJS} from 'immutable';

export default function render(req, res, next) {
  const requestInitialState = fromJS(initialState).mergeDeep({
    device: {
      isMobile: ['phone', 'tablet'].indexOf(req.device.type) > -1
    }
  });

  const store = configureStore(requestInitialState.toJS());

  // TODO: Refactor to user state without common.
  // const {actions} = mapDispatchToProps(store.dispatch);
  // actions.addTodo(new Todo({title: 'relax'}));

  const routes = createRoutes(() => store.getState());
  const location = createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    // console.log(error)

    if (redirectLocation) {
      console.log('redirectLocation');
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (error) {
      next(error);
      return;
    }

    if (renderProps == null) {
      console.log('renderProps == null');
      // TODO: Redirect to page we already have.
      res.send(404, 'Not found');
      return;
    }

    const ua = useragent.is(req.headers['user-agent']);
    const html = getPageHtml(renderProps, store, req.hostname, ua);
    res.send(html);
  });
}

// TODO: Refactor.
function getPageHtml(renderProps, store, hostname, ua) {
  const needIntlPolyfill = ua.safari || (ua.ie && ua.version < '11');

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
    : `//${hostname}:8080/build/app.js`;

  let scriptHtml = '';

  if (needIntlPolyfill) {
    scriptHtml += `
    <script src="/node_modules/intl/dist/Intl.min.js"></script>
    <script src="/node_modules/intl/locale-data/jsonp/en-US.js"></script>`;
  }

  scriptHtml += `
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};
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
