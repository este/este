// @flow
import { applyMiddleware, compose } from 'redux';

// TODO: Type platformMiddleware, probably Array<Middleware<...>
const initMiddleware = (platformMiddleware: Array<any>) => {
  const middleware = applyMiddleware(...platformMiddleware);
  // eslint-disable-next-line no-undef
  if (process.browser && window.devToolsExtension) {
    // eslint-disable-next-line no-undef
    return compose(middleware, window.devToolsExtension());
  }
  return middleware;
};

export default initMiddleware;
