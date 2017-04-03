// @flow
import type { Middlewares } from '../../types';
import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

const initMiddleware = (middlewares: Middlewares) => {
  const middleware = [...middlewares];

  // Logger must be the last middleware in chain.
  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
      collapsed: true,
    });
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

export default initMiddleware;
