// @flow
import type { Observable } from 'rxjs';
import type { ValidationError } from '../lib/validate';
import type {
  Dispatch as ReduxDispatch,
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';

// Algebraic data types make domain modelling easy.
// http://blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types
// Redux state is meant to be immutable.
// https://flow.org/en/docs/frameworks/redux/#toc-typing-redux-state-immutability
// TODO: Exact state, once Flow fixes spread on exact types.

export type Id = string;

export type AppError = { type: 'insufficientStorage', limit: number };

export type ValidationErrors<T> = { [key: $Keys<T>]: ValidationError };

export type FormError<Form> = {|
  appError?: AppError,
  validationErrors?: ValidationErrors<Form>,
|};

export type UserForm = {
  +name: string,
  +email: string,
  +likesCats: boolean,
  +likesDogs: boolean,
  +gender: null | 'male' | 'female' | 'other',
  +isAnarchist: boolean,
};

export type User = UserForm & {
  +id: Id,
  +createdAt: number,
  +updatedAt: number,
};

export type FormState<T> = {
  +initial: T,
  +changed: { +[id: Id]: T },
  +validationErrors: { +[id: Id]: ValidationErrors<T> },
  +error: { +[id: Id]: AppError },
  // +disabled or pending
};

export type ConfigState = {
  +baselineShown: boolean,
  +darkEnabled: boolean,
  +name: string,
  +version: string,
};

export type UsersState = {
  +form: FormState<UserForm>,
  +local: { +[id: Id]: User },
  +selected: { +[id: Id]: true },
};

export type State = {
  +apollo: Object,
  +config: ConfigState,
  +users: UsersState,
};

// Async naming: ADD_USER, ADD_USER_CANCEL, ADD_USER_ERROR, ADD_USER_SUCCESS
export type Action =
  | { type: 'ADD_10_RANDOM_USERS' }
  | { type: 'ADD_USER', form: UserForm }
  | { type: 'ADD_USER_ERROR', id: Id, error: FormError<UserForm> }
  | { type: 'ADD_USER_SUCCESS', user: User }
  | { type: 'DELETE_SELECTED_USERS' }
  | { type: 'SAVE_USER', user: User }
  | { type: 'SAVE_USER_SUCCESS', user: User }
  | { type: 'SET_USER_FORM', id: Id, form: ?UserForm }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' }
  | { type: 'TOGGLE_USERS_SELECTION', users: Array<User> };

export type Middleware = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { +[name: $Keys<State>]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

export type PlatformDependencies = {
  createUuid: () => string, // Because React Native needs different lib.
};

export type Dependencies = PlatformDependencies & {
  getState: () => State,
  getNow: () => number,
};

// TODO: There are no redux-observable flow definitions yet. Therefore, we have
// to use .filter instead of .ofType and
// https://flow.org/en/docs/lang/refinements.
// https://github.com/redux-observable/redux-observable/issues/258
export type Epic = (
  actions$: Observable<Action>,
  dependencies: Dependencies
) => Observable<Action>;

export type FunctionalComponent<P> = (
  props: P,
  context: any
) => ?React$Element<any>;
