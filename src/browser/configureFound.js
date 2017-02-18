// @flow
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import FarceActions from 'farce/lib/Actions';
import Matcher from 'found/lib/Matcher';
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';
import getStoreRenderArgs from 'found/lib/getStoreRenderArgs';
import queryMiddleware from 'farce/lib/queryMiddleware';
import reducer from 'found/lib/foundReducer';
import resolveElements from 'found/lib/resolveElements';

const configureFound = (
  routeConfig: Object,
  historyProtocol: Object = new BrowserProtocol(),
) => {
  const matcher = new Matcher(routeConfig);

  const getRenderArgs = async (store: Object, onReady: Function) => {
    store.dispatch(FarceActions.init());
    const renderArgs = await getStoreRenderArgs({
      store,
      matchContext: { store },
      resolveElements,
    });
    onReady(renderArgs);
  };

  // For hot reloading.
  const replaceRouteConfig = (nextRouteConfig: Object) => {
    matcher.routeConfig = nextRouteConfig;
  };

  const storeEnhancers = [
    createHistoryEnhancer({
      protocol: historyProtocol,
      middlewares: [queryMiddleware],
    }),
    createMatchEnhancer(matcher),
  ];

  return {
    getRenderArgs,
    reducer,
    replaceRouteConfig,
    storeEnhancers,
  };
};

export default configureFound;
