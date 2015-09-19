import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import configureStore from '@este/common/lib/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createRoutes from './createRoutes';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';

const app = document.getElementById('app');
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const routes = createRoutes(() => store.getState().toJS());

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <Router history={createBrowserHistory()}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>,
  app
);
