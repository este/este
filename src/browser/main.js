/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/Root';
import configureReporting from '../common/configureReporting';
import configureStore from '../common/configureStore';
import createStorageEngine from 'redux-storage-engine-localstorage';
import uuid from 'uuid';
import { browserHistory } from 'react-router';
import { fromJSON } from '../common/transit';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

const initialState = fromJSON(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
const reportingMiddleware = configureReporting({
  appVersion: initialState.config.appVersion,
  sentryUrl: initialState.config.sentryUrl,
  unhandledRejection: fn => window.addEventListener('unhandledrejection', fn),
});
const store = configureStore({
  initialState,
  platformDeps: { createStorageEngine, uuid },
  platformMiddleware: [reportingMiddleware, routerMiddleware(browserHistory)],
});
const history = syncHistoryWithStore(browserHistory, store);
const appElement = document.getElementById('app');

// Initial render.
ReactDOM.render(
  <Root history={history} store={store} />
, appElement);

// Hot reload render.
// gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
if (module.hot) {
  module.hot.accept('./app/Root', () => {
    const NextRoot = require('./app/Root').default;

    ReactDOM.render(
      <NextRoot history={history} store={store} />
    , appElement);
  });
}
