import * as storage from 'redux-storage';
import Firebase from 'firebase';
import appReducer from './app/reducer';
import createLogger from 'redux-logger';
import isomorphicFetch from 'isomorphic-fetch';
import promiseMiddleware from 'redux-promise-middleware';
import recycle from 'redux-recycle';
import shortid from 'shortid';
import storageDebounce from 'redux-storage-decorator-debounce';
import storageFilter from 'redux-storage-decorator-filter';
import validate from './validate';
import { LOGOUT } from './auth/actions';
import { SET_CURRENT_LOCALE } from './intl/actions';
import { applyMiddleware, compose, createStore } from 'redux';

// Este dependency injection middleware. So simple that we don't need a lib.
// It's like mixed redux-thunk and redux-inject.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative';

const enableLogger =
  process.env.NODE_ENV !== 'production' &&
  process.env.IS_BROWSER || isReactNative;

const enableDevToolsExtension =
  process.env.NODE_ENV !== 'production' &&
  process.env.IS_BROWSER &&
  window.devToolsExtension;

export default function configureStore(options) {
  const {
    createEngine,
    initialState,
    platformDeps = {},
    platformMiddleware = []
  } = options;

  const engineKey = `redux-storage:${initialState.config.appName}`;
  const engine = createEngine && createEngine(engineKey); // No server engine.
  const firebase = new Firebase(initialState.config.firebaseUrl);
  // // Check whether connection works.
  // firebase.child('hello-world').set({
  //   createdAt: Firebase.ServerValue.TIMESTAMP
  // });

  let reducer = appReducer;
  reducer = recycle(reducer, [LOGOUT], {
    // Whitelist app initialState props to be preserved after a logout.
    device: initialState.device,
    intl: initialState.intl
  });

  const middleware = [
    ...platformMiddleware,
    injectMiddleware({
      ...platformDeps,
      engine,
      fetch: isomorphicFetch,
      firebase,
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      validate
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ];

  if (engine) {
    let decoratedEngine = storageFilter(engine, [
      ['intl', 'currentLocale']
    ]);
    decoratedEngine = storageDebounce(decoratedEngine, 300);
    middleware.push(storage.createMiddleware(decoratedEngine, [], [
      SET_CURRENT_LOCALE
    ]));
  }

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    middleware.push(logger);
  }

  const createStoreWithMiddleware = enableDevToolsExtension
    ? compose(applyMiddleware(...middleware), window.devToolsExtension())
    : applyMiddleware(...middleware);
  const store = createStoreWithMiddleware(createStore)(reducer, initialState);

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
