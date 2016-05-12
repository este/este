import React from 'react';
import ReactDOM from 'react-dom';
import configureReporting from '../common/configureReporting';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-localstorage';
import createRoutes from './createRoutes';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { addLocaleData } from 'react-intl';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

// App supported locales are defined in src/server/config.js
// Note the explicit enumeration, that's because static analysis ftw.
import cs from 'react-intl/locale-data/cs';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import pt from 'react-intl/locale-data/pt';
import ro from 'react-intl/locale-data/ro';

[cs, de, en, es, fr, pt, ro].forEach(locale => addLocaleData(locale));

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
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
