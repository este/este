// @flow
import initMiddleware, { type PlatformMiddleware } from './init-middleware';
import initReducer, { type PlatformReducers } from './init-reducer';
import type { Action, State } from '../../types';
import { createStore, type Store } from 'redux';

let clientStore = null;

// Exact object type prevents typos.
// https://flow.org/en/docs/types/objects/#toc-exact-object-types
type Options = {|
  platformReducers?: PlatformReducers,
  platformMiddleware?: PlatformMiddleware,
|};

const initStore = (initialState: State, options?: Options) => {
  const {
    platformMiddleware = [],
    platformReducers = {},
  } = options || {};
  let store;
  if (!process.browser || !clientStore) {
    const reducer = initReducer(platformReducers);
    const middleware = initMiddleware(platformMiddleware);
    store = createStore(reducer, initialState, middleware);
    // Always return new store for server rendering.
    if (!process.browser) {
      return store;
    }
    clientStore = store;
  }
  return clientStore;
};

export default initStore;
