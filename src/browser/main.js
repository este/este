/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/Root';
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

const store = configureStore({
  initialState,
  platformDeps: { uuid, storageEngine: localforage },
  platformMiddleware: [reportingMiddleware],
});

const appElement = document.getElementById('app');

// Initial render.
ReactDOM.render(
  <Root store={store} />
, appElement);

// Hot reload render.
// gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./app/Root', () => {
    const NextRoot = require('./app/Root').default;

    ReactDOM.render(
      <NextRoot store={store} />
    , appElement);
  });
}
