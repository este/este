import React from 'react';
import ReactDOM from 'react-dom';
import configureReporting from '../common/configureReporting';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-localstorage';
import createRoutes from './createRoutes';
import useScroll from 'react-router-scroll';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

const initialState = window.__INITIAL_STATE__;
const reportingMiddleware = configureReporting({
  appVersion: initialState.config.appVersion,
  sentryUrl: initialState.config.sentryUrl,
  unhandledRejection: fn => window.addEventListener('unhandledrejection', fn)
});
const store = configureStore({
  createEngine,
  initialState,
  platformMiddleware: [reportingMiddleware, routerMiddleware(browserHistory)]
});
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store.getState);

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      render={applyRouterMiddleware(useScroll())}
    >
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
