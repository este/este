import React from 'react';
import ReactDOM from 'react-dom';
import configureReporting from '../common/configureReporting';
import configureStore from '../common/configureStore';
import createRoutes from './createRoutes';
import createStorageEngine from 'redux-storage-engine-localstorage';
import useScroll from 'react-router-scroll';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { fromJSON } from '../common/transit';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

const initialState = fromJSON(window.__INITIAL_STATE__);
const reportingMiddleware = configureReporting({
  appVersion: initialState.config.appVersion,
  sentryUrl: initialState.config.sentryUrl,
  unhandledRejection: fn => window.addEventListener('unhandledrejection', fn)
});
const store = configureStore({
  initialState,
  platformDeps: { createStorageEngine },
  platformMiddleware: [reportingMiddleware, routerMiddleware(browserHistory)],
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
