// @flow
import type { Middlewares, Reducers, State } from '../types';
import initMiddleware from './middleware';
import initReducer from './reducers';
import { createStore } from 'redux';

let clientStore = null;

// Exact object type prevents typos.
// https://flow.org/en/docs/types/objects/#toc-exact-object-types
type Options = {|
  reducers?: Reducers,
  middlewares?: Middlewares,
|};

const initStore = (initialState: State, options?: Options) => {
  const {
    middlewares = [],
    reducers = {},
  } = options || {};
  let store;
  if (!process.browser || !clientStore) {
    const reducer = initReducer(reducers);
    const middleware = initMiddleware(middlewares);
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
