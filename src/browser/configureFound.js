// @flow
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import FarceActions from 'farce/lib/Actions';
import Matcher from 'found/lib/Matcher';
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';
import queryMiddleware from 'farce/lib/queryMiddleware';
import reducer from 'found/lib/foundReducer';

const configureFound = (routeConfig: Object) => {
  const matcher = new Matcher(routeConfig);

  const init = (store: Object) => {
    store.dispatch(FarceActions.init());
  };

  // For hot reloading.
  const replaceRouteConfig = (nextRouteConfig: Object) => {
    matcher.routeConfig = nextRouteConfig;
  };

  const storeEnhancers = [
    createHistoryEnhancer({
      protocol: new BrowserProtocol(),
      middlewares: [queryMiddleware],
    }),
    createMatchEnhancer(matcher),
  ];

  return { init, reducer, replaceRouteConfig, storeEnhancers };
};

export default configureFound;
