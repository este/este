// @flow
import type { PlatformDependencies, Middleware } from '../types';
import rootEpic from './root-epic';
import { applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

// Redux logger for Node.js.
// TODO: Pull request for https://github.com/evgenyrodionov/redux-logger.
const nodeLogger = () => next => action => {
  const { type, ...props } = action;
  const propsAsShortString = JSON.stringify(props).slice(0, 60);
  // eslint-disable-next-line no-console
  console.log(`action ${type}, ${propsAsShortString}...`);
  return next(action);
};

const createReduxMiddleware = (
  platformDependencies: PlatformDependencies,
  platformMiddleware: Middleware
) => {
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
      ...platformDependencies,
      getNow: Date.now,
    },
  });
  const middleware = [...platformMiddleware, epicMiddleware];

  // Logger must be the last middleware in chain.
  if (process.env.NODE_ENV !== 'production') {
    const logger = process.browser
      ? createLogger({ collapsed: true })
      : nodeLogger;
    middleware.push(logger);
  }

  // TODO:
  // if (module.hot && typeof module.hot.accept === 'function') {
  //   if (isReactNative) {
  //     module.hot.accept(() => {
  //       const configureEpics = require('./configureEpics').default;
  //
  //       epicMiddleware.replaceEpic(configureEpics(deps));
  //     });
  //   } else {
  //     module.hot.accept('./configureEpics', () => {
  //       const configureEpics = require('./configureEpics').default;
  //
  //       epicMiddleware.replaceEpic(configureEpics(deps));
  //     });
  //   }
  // }

  const appliedMiddleware = applyMiddleware(...middleware);

  if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
    return compose(appliedMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  return appliedMiddleware;
};

export default createReduxMiddleware;
