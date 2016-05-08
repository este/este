import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-localstorage';
import createRoutes from './createRoutes';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ValidationError } from '../common/lib/validation';
import { addLocaleData } from 'react-intl';
import { firebaseMessages } from '../common/lib/redux-firebase';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import cs from 'react-intl/locale-data/cs';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import no from 'react-intl/locale-data/no';
import pt from 'react-intl/locale-data/pt';
import ro from 'react-intl/locale-data/ro';

// github.com/yahoo/react-intl/wiki/Upgrade-Guide#add-call-to-addlocaledata-in-browser
addLocaleData([cs, de, es, en, fr, no, pt, ro]);

// bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
// TODO: Refactor out.
window.addEventListener('unhandledrejection', event => {
  event.preventDefault();
  const { reason: error } = event.detail;
  const isNegligibleError =
    error.reason instanceof ValidationError ||
    firebaseMessages[error.reason.code];
  if (isNegligibleError) return;
  if (process.env.NODE_ENV === 'production') {
    // TODO: Report via Sentry.
  } else {
    /* eslint-disable no-console */
    console.warn('Unhandled promise rejection. Fix it or it will be reported.');
    console.warn(error);
    /* eslint-enable no-console */
  }
});

const store = configureStore({
  createEngine,
  initialState: window.__INITIAL_STATE__,
  platformMiddleware: [routerMiddleware(browserHistory)]
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
