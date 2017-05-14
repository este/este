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
  +baselineShown: boolean,
  +darkEnabled: boolean,
  +name: string,
  +online: boolean,
  +version: string,
};

export type Fields = {
  +userName: string,
  +userDescription: string,
  +userLikesCats: boolean,
  +userLikesDogs: boolean,
  +userGender: null | 'male' | 'female' | 'other',
  +userWantsKing: boolean,
};

export type FieldsState = {
  initial: Fields,
  changed: { [id: string]: Fields },
};

export type State = {
  +app: AppState,
  +fields: FieldsState,
};

export type Action =
  | { type: 'SET_APP_ONLINE', +payload: {| +online: boolean |} }
  | { type: 'SET_FIELD', +payload: {| +id: string, +fields: Fields |} }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' };

export type Reducers = { [reducerName: string]: Reducer<State, Action> };
export type Middlewares = Array<ReduxMiddleware<State, Action>>;
