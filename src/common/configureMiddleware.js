/* @flow weak */
import configureDeps from './configureDeps';
import configureEpics from './configureEpics';
import createLoggerMiddleware from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

// Like redux-thunk, but with just one argument.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action,
  );

const configureMiddleware = (initialState, platformDeps, platformMiddleware) => {
  const deps = configureDeps(initialState, platformDeps);
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
    const logger = createLoggerMiddleware({
      collapsed: true,
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

  return middleware;
};

export default configureMiddleware;
