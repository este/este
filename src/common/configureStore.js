import appReducer from './app/reducer';
import createFetch from './createFetch';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import shortid from 'shortid';
import validate from './validate';
import {applyMiddleware, compose, createStore} from 'redux';

export default function configureStore({deps, initialState}) {

  // Este dependency injection middleware. So simple that we don't need a lib.
  // It's like mixed redux-thunk and redux-inject.
  const injectMiddleware = deps => store => next => action =>
    next(typeof action === 'function'
      ? action({...deps, store})
      : action
    );

  // Remember to set SERVER_URL for deploy.
  const serverUrl = process.env.SERVER_URL ||
    // Browser is ok with relative url. Server and React Native need absolute.
    (process.env.IS_BROWSER ? '' : 'http://localhost:8000');

  const middleware = [
    injectMiddleware({
      ...deps,
      fetch: createFetch(serverUrl),
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      validate
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ];

  // Enable logger only for browser and React Native development.
  const enableLogger = process.env.NODE_ENV !== 'production' &&
    (process.env.IS_BROWSER || process.env.IS_REACT_NATIVE);

  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    // Logger must be the last middleware in chain.
    middleware.push(logger);
  }

  const enableDevToolsExtension =
    process.env.NODE_ENV !== 'production' &&
    process.env.IS_BROWSER &&
    window.devToolsExtension;

  const createReduxStore = enableDevToolsExtension
    ? compose(applyMiddleware(...middleware), window.devToolsExtension())
    : applyMiddleware(...middleware);
  const store = createReduxStore(createStore)(appReducer, initialState);

  // Enable hot reload where available.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/reducer', () => {
      const nextAppReducer = require('./app/reducer');
      store.replaceReducer(nextAppReducer);
    });
  }

  return store;
}
