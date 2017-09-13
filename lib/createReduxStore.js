// @flow
import type { Reducers, Middleware } from '../types';
import createReduxMiddleware from './createReduxMiddleware';
import createReduxReducer from './createReduxReducer';
import { applyMiddleware, compose, createStore } from 'redux';

type Options = {
  platformReducers?: Reducers,
  platformMiddleware?: Middleware,
};

const makeReducersHotReloadable = (store, platformReducers) => {
  if (!module.hot || typeof module.hot.accept !== 'function') return;
  // if (isReactNative) {
  //   // React Native for some reason doesn't need an explicit path.
  //   // facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html
  //   module.hot.accept(() => {
  //     const configureReducer = require('./configureReducer').default;
  //
  //     store.replaceReducer(configureReducer(platformReducers, initialState));
  //   });
  // } else {
  // Webpack for some reason needs an explicit path.
  module.hot.accept('./createReduxReducer', () => {
    // eslint-disable-next-line global-require
    const createReduxReducer = require('./createReduxReducer').default;
    store.replaceReducer(createReduxReducer(platformReducers));
  });
};

const createReduxStore = (initialState: Object, options: Options = {}) => {
  const { platformReducers = {}, platformMiddleware = [] } = options;
  const reducer = createReduxReducer(platformReducers);
  const middleware = createReduxMiddleware(platformMiddleware);
  let storeEnhancer = applyMiddleware(...middleware);

  if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
    storeEnhancer = compose(
      storeEnhancer,
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
  }

  // $FlowFixMe Idk.
  const store = createStore(reducer, initialState, storeEnhancer);
  makeReducersHotReloadable(store, platformReducers);
  return store;
};

export default createReduxStore;
