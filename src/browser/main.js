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
import cookie from 'js-cookie';
import { persistStore, createTransform } from 'redux-persist';
import { pick } from 'ramda';

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

const cookiePaths = [
  ['app', ['currentTheme']],
  ['intl', ['currentLocale']],
];

const transforms = [];

cookiePaths.forEach(([feature, props]) => {
  if (!props) return;

  const write = state => {
    const values = pick(props, state);
    Object.keys(values).forEach(prop => {
      const newValue = values[prop];
      const cookieKey = `${feature}.${prop}`;
      if (typeof newValue !== 'undefined' && newValue !== '') {
        cookie.set(cookieKey, newValue);
      } else {
        cookie.remove(cookieKey);
      }
    });
    return values;
  };

  const read = state => {
    const values = pick(props, state);
    Object.keys(values).forEach(prop => {
      const cookieValue = cookie.get(`${feature}.${prop}`);
      if (cookieValue) {
        values[prop] = cookieValue;
      }
    });
    return values;
  };

  transforms.push(createTransform(write, read, { whitelist: [feature] }));
});

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
        ...configureStorage(initialState.config.appName, transforms),
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
