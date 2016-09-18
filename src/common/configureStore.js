/* @flow */
/* eslint-env browser*/
import configureReducer from './configureReducer';
import configureMiddleware from './configureMiddleware';
import { applyMiddleware, createStore, compose } from 'redux';

type Options = {
  initialState: Object,
  platformDeps?: Object,
  platformMiddleware?: Array<Function>,
};

const configureStore = (options: Options) => {
  const {
    initialState,
    platformDeps = {},
    platformMiddleware = [],
  } = options;

  const reducer = configureReducer(initialState);

  const middleware = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware
  );

  let devTools = f => f;
  if (typeof window === 'object') {
    if (typeof window.devToolsExtension !== 'undefined') {
      devTools = window.devToolsExtension();
    }
  }
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      devTools
    )
  );

  // Enable hot reloading for reducers.
  if (module.hot) {
    if (initialState.device.isReactNative) {
      // React Native for some reason needs accept without the explicit path.
      // facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html
      module.hot.accept(() => {
        const configureReducer = require('./configureReducer').default;

        store.replaceReducer(configureReducer(initialState));
      });
    } else {
      // Webpack for some reason needs accept with the explicit path.
      module.hot.accept('./configureReducer', () => {
        const configureReducer = require('./configureReducer').default;

        store.replaceReducer(configureReducer(initialState));
      });
    }
  }

  return store;
};

export default configureStore;
