// @flow
import type { Middleware as ReduxMiddleware, Reducer } from 'redux';

// Algebraic types ftw.
// blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types
// Using covariants to enforce immutability.
// flow.org/en/docs/frameworks/redux/#toc-typing-redux-state-immutability

export type AppState = {
  +online: boolean,
};

export type State = {
  +app: AppState,
};

export type Action = { type: 'SET_APP_ONLINE', +payload: { +online: boolean } };

export type Reducers = { [reducerName: string]: Reducer<State, Action> };
export type Middlewares = Array<ReduxMiddleware<State, Action>>;
