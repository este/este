// @flow
import type { Middlewares, Reducers } from '../types';
import createReduxMiddleware from './create-redux-middleware';
import createReduxReducer from './create-redux-reducer';
import { compose, createStore } from 'redux';
import { autoRehydrate } from 'redux-persist';

// Exact object type prevents typos.
// https://flow.org/en/docs/types/objects/#toc-exact-object-types
type Options = {|
  platformReducers?: Reducers,
  platformMiddlewares?: Middlewares,
|};

const createReduxStore = (initialState: Object, options?: Options) => {
  const { platformMiddlewares = [], platformReducers = {} } = options || {};
  const reducer = createReduxReducer(platformReducers);
  const middleware = createReduxMiddleware(platformMiddlewares);
  return createStore(
    reducer,
    initialState,
    compose(middleware, autoRehydrate())
  );
};

export default createReduxStore;
