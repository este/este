// @flow
import type { Action } from '../common/types';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/Root';
import configureFound from './configureFound';
import configureReporting from '../common/configureReporting';
import configureStorage from '../common/configureStorage';
import configureStore from '../common/configureStore';
import localforage from 'localforage';
import uuid from 'uuid';
import { persistStore } from 'redux-persist';

const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

const reportingMiddleware = configureReporting({
  appVersion: initialState.config.appVersion,
  sentryUrl: initialState.config.sentryUrl,
  unhandledRejection: fn => window.addEventListener('unhandledrejection', fn),
});

// Why Found instead of React Router? Because Found is more powerful.
// medium.com/@taion/react-routing-and-data-fetching-ec519428135c
const found = configureFound(Root.routeConfig);

const store = configureStore({
  initialState,
  platformDeps: { uuid },
  platformReducers: { found: found.reducer },
  platformMiddleware: [reportingMiddleware],
  platformStoreEnhancers: found.storeEnhancers,
});

const appElement = document.getElementById('app');

// 1. get found render args
// 2. initial render (before rehydrate, to match client and server render)
// 3. rehydrate local app state
// 4. dispatch APP_STARTED
found.getRenderArgs(store, renderArgs => {
  const onRehydrate = () => {
    // Don't import appStarted action creator since it would break hot reload.
    store.dispatch(({ type: 'APP_STARTED' }: Action));

    // gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
    if (!module.hot || typeof module.hot.accept !== 'function') return;
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
  };

  const afterInitialRender = () => {
    persistStore(
      store,
      {
        ...configureStorage(initialState.config.appName),
        storage: localforage,
      },
      onRehydrate,
    );
  };

  ReactDOM.render(
    <Root renderArgs={renderArgs} store={store} />,
    appElement,
    afterInitialRender,
  );
});
