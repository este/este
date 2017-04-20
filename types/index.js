// @flow
import type { Middleware as ReduxMiddleware, Reducer } from 'redux';

// Algebraic types ftw.
// https://blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types
// Using covariants to enforce immutability.
// https://flow.org/en/docs/frameworks/redux/#toc-typing-redux-state-immutability
// TODO:
//  - Make all types exact: https://github.com/facebook/flow/issues/2405
//    Exact type doesn't work with covariants yet.

export type AppState = {
  +name: string,
  +version: string,
  +online: boolean,
};

export type State = {
  +app: AppState,
};

export type Action = { type: 'SET_APP_ONLINE', +payload: { +online: boolean } };

export type Reducers = { [reducerName: string]: Reducer<State, Action> };
export type Middlewares = Array<ReduxMiddleware<State, Action>>;
