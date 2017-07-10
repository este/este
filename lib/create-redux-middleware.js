// @flow
import type { PlatformDependencies, Middleware } from '../types';
import rootEpic from './root-epic';
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

const makeEpicsHotReloadable = epicMiddleware => {
  if (!module.hot || typeof module.hot.accept !== 'function') return;
  // if (isReactNative) {
  //   module.hot.accept(() => {
  //     const configureEpics = require('./configureEpics').default;
  //     epicMiddleware.replaceEpic(configureEpics(deps));
  //   });
  // } else {
  module.hot.accept('./root-epic', () => {
    // eslint-disable-next-line global-require
    const rootEpic = require('./root-epic').default;
    epicMiddleware.replaceEpic(rootEpic);
  });
};

const createReduxMiddleware = (
  platformDependencies: PlatformDependencies,
  platformMiddleware: Middleware,
): Middleware => {
  const dependencies = { ...platformDependencies, getNow: Date.now };
  const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies });
  const middleware = [...platformMiddleware, epicMiddleware];
  // Logger must be the last middleware in chain.
  if (process.env.NODE_ENV !== 'production') {
    const logger = process.browser
      ? createLogger({ collapsed: true })
      : nodeLogger;
    middleware.push(logger);
  }
  makeEpicsHotReloadable(epicMiddleware);
  return middleware;
};

export default createReduxMiddleware;
