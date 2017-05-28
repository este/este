// @flow
import type {
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';

// Algebraic data types make domain modelling easy.
// http://blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types/
// Redux state is meant to be immutable.
// https://flow.org/en/docs/frameworks/redux/#toc-typing-redux-state-immutability
// TODO: Exact state, once Flow fix spread on exact types.

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

export type User = UserForm & {
  +id: Id,
  +createdAt: number,
  +updatedAt?: number,
};

type Form<T> = {
  +initialState: T,
  +changedState: { +[id: Id]: T },
};

export type UsersState = {
  +form: Form<UserForm>,
  +local: { +[id: Id]: User },
  +selected: { +[id: Id]: true },
};

export type State = {
  +apollo: Object,
  +app: AppState,
  +users: UsersState,
};

export type Action =
  | { type: 'SET_USER_FORM', id: Id, state: ?UserForm }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' }
  | { type: 'ADD_USER', user: User }
  | { type: 'SAVE_USER', user: User }
  | { type: 'TOGGLE_SELECTED_USERS', users: Array<User> }
  | { type: 'DELETE_SELECTED_USERS' };

export type Middlewares = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { +[reducerName: string]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;
export type FunctionalComponent<P> = (props: P) => ?React$Element<any>;
