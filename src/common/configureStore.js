import Firebase from 'firebase';
import appReducer from './app/reducer';
import createLogger from 'redux-logger';
import isomorphicFetch from 'isomorphic-fetch';
import promiseMiddleware from 'redux-promise-middleware';
import shortid from 'shortid';
import storageDebounce from 'redux-storage-decorator-debounce';
import storageFilter from 'redux-storage-decorator-filter';
import validate from './validate';
import { LOGOUT } from './auth/actions';
import { SET_CURRENT_LOCALE } from './intl/actions';
import { applyMiddleware, createStore } from 'redux';
import { createMiddleware as createStorageMiddleware } from 'redux-storage';

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative';

const enableLogger =
  process.env.NODE_ENV !== 'production' &&
  process.env.IS_BROWSER || isReactNative;

// Like redux-thunk with dependency injection.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

// Reset app state on logout, stackoverflow.com/q/35622588/233902.
const resetOnLogout = (reducer, initialState) => (state, action) => {
  if (action.type === LOGOUT) {
    state = {
      device: initialState.device,
      intl: initialState.intl,
      routing: state.routing // Note routing state has to be reused.
    };
  }
  return reducer(state, action);
};

// blog.ploeh.dk/2011/07/28/CompositionRoot
export default function configureStore(options) {
  const {
    createEngine,
    initialState,
    platformDeps = {},
    platformMiddleware = []
  } = options;

  const engineKey = `redux-storage:${initialState.config.appName}`;
  const engine = createEngine && createEngine(engineKey);
  const firebase = new Firebase(initialState.config.firebaseUrl);
  // // Check whether connection works.
  // firebase.child('hello-world').set({
  //   createdAt: Firebase.ServerValue.TIMESTAMP
  // });

  const middleware = [
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
    }),
    ...platformMiddleware
  ];

  if (engine) {
    let decoratedEngine = storageFilter(engine, [
      ['intl', 'currentLocale']
    ]);
    decoratedEngine = storageDebounce(decoratedEngine, 300);
    middleware.push(createStorageMiddleware(decoratedEngine, [], [
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

  const store = createStore(
    resetOnLogout(appReducer, initialState),
    initialState,
    applyMiddleware(...middleware)
  );

  // Enable hot reload where available.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/reducer', () => {
      const nextAppReducer = require('./app/reducer');
      store.replaceReducer(resetOnLogout(nextAppReducer, initialState));
    });
  }

  return store;
}
