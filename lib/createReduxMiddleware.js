// @flow
import type { Middleware } from '../types';
import { createLogger } from 'redux-logger';

const createReduxMiddleware = (platformMiddleware: Middleware): Middleware => {
  const middleware = [...platformMiddleware];
  // Logger must be the last middleware in chain.
  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({ collapsed: true });
    middleware.push(logger);
  }
  return middleware;
};

export default createReduxMiddleware;
