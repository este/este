// @flow
import type {
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';

// Algebraic types ftw.
// https://blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types
// Immutability ftw.
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

// Leverage $PropertyType<T, x>
// Potrebuju initialState a any change pres id, ktere je dynamic
export type FormsState = {
  +newUser: {
    +name: string,
    +description: string,
    +likesCats: boolean,
    +likesDogs: boolean,
    +gender: null | 'male' | 'female' | 'other',
    +wantsKing: boolean,
  },
  // +changed: { +[id: string]: Fields },
};

export type State = {
  +app: AppState,
  +forms: FormsState,
};

export type Action =
  // | { type: 'RESET_FIELDS', +payload: {| +id: string |} }
  | { type: 'SET_APP_ONLINE', +payload: {| +online: boolean |} }
  | {
      type: 'SET_FIELD',
      +payload: {| +id: string, +name: any, +value: any |},
    }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' };

export type Reducers = { +[reducerName: string]: ReduxReducer<State, Action> };

export type Middlewares = Array<ReduxMiddleware<State, Action>>;

export type Store = ReduxStore<State, Action>;

export type FunctionalComponent<P> = (props: P) => ?React$Element<any>;
