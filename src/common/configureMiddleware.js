import createLoggerMiddleware from 'redux-logger';
import promiseMiddleware from './lib/promiseMiddleware'; // eslint-disable-line
import validate from './validate';

// Like redux-thunk but with dependency injection.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  );

const configureMiddleware = (initialState, platformDeps, platformMiddleware) => {
  const middleware = [
    injectMiddleware({
      ...platformDeps,
      getUid: () => platformDeps.uuid.v4(),
      now: () => Date.now(),
      validate,
    }),
    promiseMiddleware,
    ...platformMiddleware,
  ];

  const enableLogger = process.env.NODE_ENV !== 'production' && (
    process.env.IS_BROWSER || initialState.device.isReactNative
  );

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const ignoredActions = [];
    const logger = createLoggerMiddleware({
      collapsed: true,
      predicate: (getState, action) => ignoredActions.indexOf(action.type) === -1,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state)),
    });
    middleware.push(logger);
  }

  return middleware;
};

export default configureMiddleware;
