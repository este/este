// @flow
import configureMiddleware from './configureMiddleware';
import configureReducer from './configureReducer';
import isReactNative from './app/isReactNative';
import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';

type Options = {
  initialState: Object,
  platformDeps?: Object,
  platformReducers?: Object,
  platformMiddleware?: Array<Function>,
  platformStoreEnhancers?: Array<Function>,
};

const configureStore = (options: Options) => {
  const {
    initialState,
    platformDeps = {},
    platformMiddleware = [],
    platformReducers = {},
    platformStoreEnhancers = [],
  } = options;

  const reducer = configureReducer(platformReducers, initialState);

  const middleware = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware,
  );

  // Add Redux DevTools support
  // TODO: use only on prod
  const composeEnhancers = typeof(window) !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // $FlowFixMe
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      autoRehydrate(),
      ...platformStoreEnhancers,
    ),
  );

  // Enable hot reloading for reducers.
  if (module.hot && typeof module.hot.accept === 'function') {
    if (isReactNative) {
      // React Native for some reason needs accept without the explicit path.
      // facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html
      module.hot.accept(() => {
        const configureReducer = require('./configureReducer').default;

        store.replaceReducer(configureReducer(platformReducers, initialState));
      });
    } else {
      // Webpack for some reason needs accept with the explicit path.
      module.hot.accept('./configureReducer', () => {
        const configureReducer = require('./configureReducer').default;

        store.replaceReducer(configureReducer(platformReducers, initialState));
      });
    }
  }

  return store;
};

export default configureStore;
