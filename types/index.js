// @flow
import type {
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';

export type Id = string;

export type AppState = {
  +baselineShown: boolean,
  +darkEnabled: boolean,
  +name: string,
  +version: string,
};

export type UserForm = {
  +name: string,
  +description: string,
  +likesCats: boolean,
  +likesDogs: boolean,
  +gender: null | 'male' | 'female' | 'other',
  +wantsKing: boolean,
};

export type FormsState = {
  +user: {
    +initialState: UserForm,
    +changes: { +[id: Id]: UserForm },
  },
};

// Algebraic data types make domain modelling easy.
// http://blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types/
// Redux state is meant to be immutable.
// https://flow.org/en/docs/frameworks/redux/#toc-typing-redux-state-immutability
export type State = {
  +app: AppState,
  +forms: FormsState,
};

export type Action =
  | { type: 'SET_USER_FORM', id: Id, state: UserForm }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' };

export type Middlewares = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { +[reducerName: string]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;
export type FunctionalComponent<P> = (props: P) => ?React$Element<any>;
