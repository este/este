import appReducer from './app/reducer';
import createFetch from './createFetch';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import shortid from 'shortid';
import validate from './validate';
import {applyMiddleware, compose, createStore} from 'redux';

const BROWSER_DEVELOPMENT =
  process.env.NODE_ENV !== 'production' &&
  process.env.IS_BROWSER;

// Remember to set deploy WEB_ADDRESS for server and react-native.
const WEB_ADDRESS = process.env.WEB_ADDRESS ||
  (process.env.IS_BROWSER ? '' : 'http://localhost:8000');

export default function configureStore({deps, initialState}) {

  // Este dependency injection middleware. So simple that we don't need a lib.
  // It's like mixed redux-thunk and redux-inject.
  const injectMiddleware = deps => store => next => action => {
    return next(typeof action === 'function'
      ? action({...deps, store})
      : action
    );
  };

  const middleware = [
    injectMiddleware({
      ...deps,
      fetch: createFetch(WEB_ADDRESS),
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      validate
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ];

  if (BROWSER_DEVELOPMENT) {
    const logger = createLogger({
      collapsed: true,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    // Logger must be the last middleware in chain.
    middleware.push(logger);
  }

  const createReduxStore = (BROWSER_DEVELOPMENT && window.devToolsExtension)
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
