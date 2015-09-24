import appReducer from './app/reducer';
import createLogger from 'redux-logger';
import fetch from 'isomorphic-fetch';
import injectDependencies from './lib/injectDependencies';
import promiseMiddleware from 'redux-promise-middleware';
import stateToJS from './lib/stateToJS';
import validate from './validate';
import {applyMiddleware, createStore} from 'redux';

export default function configureStore(initialState) {
  const dependenciesMiddleware = injectDependencies(
    {fetch},
    {validate}
  );
  const middlewares = [
    dependenciesMiddleware,
    promiseMiddleware
  ];
  const loggerEnabled =
    process.env.IS_BROWSER && // eslint-disable-line no-undef
    process.env.NODE_ENV !== 'production'; // eslint-disable-line no-undef

  if (loggerEnabled) {
    const logger = createLogger({
      collapsed: () => true,
      transformer: stateToJS
    });
    middlewares.push(logger);
  }

  const store = applyMiddleware(...middlewares)(createStore)(
    appReducer, initialState);

  if (module.hot) { // eslint-disable-line no-undef
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/reducer', () => { // eslint-disable-line no-undef
      const nextAppReducer = require('./app/reducer'); // eslint-disable-line no-undef
      store.replaceReducer(nextAppReducer);
    });
  }

  return store;
}
