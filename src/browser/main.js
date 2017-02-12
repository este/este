// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/Root';
import configureFound from './configureFound';
import configureReporting from '../common/configureReporting';
import configureStore from '../common/configureStore';
import localforage from 'localforage';
import uuid from 'uuid';

const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

const reportingMiddleware = configureReporting({
  appVersion: initialState.config.appVersion,
  sentryUrl: initialState.config.sentryUrl,
  unhandledRejection: fn => window.addEventListener('unhandledrejection', fn),
});

// Why 4Catalyzer/found router instead of React Router?
// Because Found router is much more powerful and stable.
// medium.com/@taion/react-routing-and-data-fetching-ec519428135c
// Note Jimmy Jia was the maintainer of React Router. He knows.
const found = configureFound(Root.routeConfig);

const store = configureStore({
  initialState,
  platformDeps: { uuid, storageEngine: localforage },
  platformReducers: { found: found.reducer },
  platformMiddleware: [reportingMiddleware],
  platformStoreEnhancers: found.storeEnhancers,
});

const appElement = document.getElementById('app');

found.getRenderArgs(store, renderArgs => {
  // Initial render.
  ReactDOM.render(<Root renderArgs={renderArgs} store={store} />, appElement);

  // Hot reload render.
  // gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
  if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./app/Root', () => {
      const NextRoot = require('./app/Root').default;

      found.replaceRouteConfig(NextRoot.routeConfig);
      found.getRenderArgs(store, renderArgs => {
        ReactDOM.render(
          <NextRoot renderArgs={renderArgs} store={store} />,
          appElement,
        );
      });
    });
  }
});
