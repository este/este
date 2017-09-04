// @flow
import type { Middleware } from '../types';
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

const createReduxMiddleware = (platformMiddleware: Middleware): Middleware => {
  const middleware = [...platformMiddleware];
  // Logger must be the last middleware in chain.
  if (process.env.NODE_ENV !== 'production') {
    const logger = process.browser
      ? createLogger({ collapsed: true })
      : nodeLogger;
    middleware.push(logger);
  }
  return middleware;
};

export default createReduxMiddleware;
