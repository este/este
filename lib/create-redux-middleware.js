// @flow
import type { Middlewares } from '../types';
import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

// Redux logger for Node.js.
// TODO: Pull request for evgenyrodionov/redux-logger.
const nodeLogger = () =>
  next =>
    action => {
      const { type, ...props } = action;
      const propsAsShortString = JSON.stringify(props).slice(0, 60);
      // eslint-disable-next-line
      console.log(`action ${type}, ${propsAsShortString}...`);
      return next(action);
    };

const createReduxMiddleware = (platformMiddlewares: Middlewares) => {
  const middleware = [...platformMiddlewares];

  // Logger must be the last middleware in chain.
  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    const isServer = !process.browser;
    const logger = isServer ? nodeLogger : createLogger({ collapsed: true });
    middleware.push(logger);
  }

  const appliedMiddleware = applyMiddleware(...middleware);

  // eslint-disable-next-line no-undef
  if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line no-undef
    return compose(appliedMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  return appliedMiddleware;
};

export default createReduxMiddleware;
