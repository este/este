/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as Fela } from 'react-fela';
import { createRenderer } from 'fela';
import { globalStyles } from './app/themes';
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
const mountNode = document.getElementById('stylesheet');

// Initial stylesheet w/ global styles
const renderer = createRenderer();
const createGlobalStyles = rules =>
  Object.keys(rules).forEach(selector =>
  renderer.renderStatic(rules[selector], selector));

createGlobalStyles(globalStyles);

// Initial render.
ReactDOM.render(
  <Fela renderer={renderer} mountNode={mountNode}>
    <Root store={store} />
  </Fela>
, appElement);

// Hot reload render.
// gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./app/themes', () => {
    renderer.clear();
    createGlobalStyles(require('./app/themes').globalStyles);
  });

  module.hot.accept('./app/Root', () => {
    const NextRoot = require('./app/Root').default;

    ReactDOM.render(
      <NextRoot store={store} />
    , appElement);
  });
}

if (process.env.NODE_ENV !== 'production') {
  window.Perf = require('react-addons-perf');
}
