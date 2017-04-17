// @flow
import type { Middlewares, Reducers, State } from '../types';
import createReduxMiddleware from './create-redux-middleware';
import createReduxReducer from './create-redux-reducer';
import { createStore } from 'redux';

// Exact object type prevents typos.
// https://flow.org/en/docs/types/objects/#toc-exact-object-types
type Options = {|
  platformReducers?: Reducers,
  platformMiddlewares?: Middlewares,
|};

const createReduxStore = (initialState: State, options?: Options) => {
  const { platformMiddlewares = [], platformReducers = {} } = options || {};
  const reducer = createReduxReducer(platformReducers);
  const middleware = createReduxMiddleware(platformMiddlewares);
  return createStore(reducer, initialState, middleware);
};

export default createReduxStore;
