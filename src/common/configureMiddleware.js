/* @flow weak */
import { REHYDRATE } from 'redux-persist/constants';
import createLoggerMiddleware from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import configureDeps from './configureDeps';
import configureEpics from './configureEpics';
import configureStorage from './configureStorage';

// Like redux-thunk, but with just one argument.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

const configureMiddleware = (initialState, platformDeps, platformMiddleware) => {
  const storageConfig = configureStorage(initialState, platformDeps.storageEngine);
  const deps = configureDeps(initialState, platformDeps, storageConfig);
  const rootEpic = configureEpics(deps);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middleware = [
    injectMiddleware(deps),
    epicMiddleware,
    ...platformMiddleware,
  ];

  const enableLogger = process.env.NODE_ENV !== 'production' && (
    process.env.IS_BROWSER || initialState.device.isReactNative
  );

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const ignoredActions = [REHYDRATE];
    const logger = createLoggerMiddleware({
      collapsed: true,
      predicate: (getState, action) => ignoredActions.indexOf(action.type) === -1,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state)),
    });
    middleware.push(logger);
  }

  if (module.hot && typeof module.hot.accept === 'function') {
    if (initialState.device.isReactNative) {
      module.hot.accept(() => {
        const configureEpics = require('./configureEpics').default;

        epicMiddleware.replaceEpic(configureEpics(deps));
      });
    } else {
      module.hot.accept('./configureEpics', () => {
        const configureEpics = require('./configureEpics').default;

        epicMiddleware.replaceEpic(configureEpics(deps));
      });
    }
  }

  return { storageConfig, middleware };
};

export default configureMiddleware;
