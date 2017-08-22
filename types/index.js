// @flow

// Algebraic data types make domain modelling easy.
// http://blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types

// IMPORTANT ADVICE!
// Think twice before using covariants and exact type. It's buggy as hell and
// Flow errors are misleading. Life is hard and short. Don't fight with Flow.
// If something doesn't work, check Flow issues and probably don't use it.
// Feel free to use 'FlowFixMe Describe why' anytime. Favour it over any type.

import type { Observable as RxObservable } from 'rxjs';
import type { ValidationError } from '../lib/validate';
import type {
  Dispatch as ReduxDispatch,
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';

import type { AppState } from '../reducers/app';
import type { AuthFormFields, AuthState } from '../reducers/auth';
import type { PostFormFields, PostsState } from '../reducers/posts';
import type { UserFormFields, UsersState, User } from '../reducers/users';

export type Id = string;

export type AppError =
  | { type: 'insufficientStorage', limit: number }
  | { type: 'xhrError' }
  | { type: 'cannotSignInCredentialsInvalid' }
  | { type: 'unknown', message: string };

export type ValidationErrors<T> = { [key: $Keys<T>]: ValidationError };

export type Errors<T> = {|
  appError?: AppError,
  validationErrors?: ValidationErrors<T>,
|};

export type Form<Fields> = {
  fields: Fields,
  disabled: boolean,
  appError: ?AppError,
  validationErrors: ValidationErrors<Fields>,
};

export type FormState<Fields> = {
  initial: Form<Fields>,
  changed: { [id: Id]: Form<Fields> },
};

export type State = {
  app: AppState,
  auth: AuthState,
  posts: PostsState,
  users: UsersState,
};

export type ServerState = {
  app: AppState,
};

export type Action =
  | { type: 'AUTH', fields: AuthFormFields }
  | { type: 'AUTH_ERROR', errors: Errors<AuthFormFields> }
  | { type: 'AUTH_SUCCESS' }
  | { type: 'CREATE_10_RANDOM_USERS' }
  | { type: 'CREATE_POST', fields: PostFormFields, viewerId: Id, authorId: Id }
  | { type: 'CREATE_POST_ERROR', errors: Errors<PostFormFields> }
  | { type: 'CREATE_POST_SUCCESS' }
  | { type: 'CREATE_USER', fields: UserFormFields }
  | { type: 'CREATE_USER_ERROR', errors: Errors<UserFormFields> }
  | { type: 'CREATE_USER_SUCCESS', user: User }
  | { type: 'DELETE_SELECTED_USERS' }
  | { type: 'SAVE_USER', user: User }
  | { type: 'SAVE_USER_ERROR', user: User, errors: Errors<UserFormFields> }
  | { type: 'SAVE_USER_SUCCESS', user: User }
  | { type: 'SET_AUTH_FORM', fields: ?AuthFormFields }
  | { type: 'SET_POST_FORM', fields: ?PostFormFields, id?: Id }
  | { type: 'SET_USER_FORM', fields: ?UserFormFields, id?: Id }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' }
  | { type: 'TOGGLE_USERS_SELECTION', users: Array<User> };

export type Middleware = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { [name: $Keys<State>]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

// Replace once Relay Modern will have flow-typed typedefs.
export type Environment = Object;

export type PlatformDependencies = {
  createUuid: () => string, // Because React Native needs different lib.
  getEnvironment: () => Environment,
};

export type Dependencies = PlatformDependencies & {
  getState: () => State,
  getNow: () => number,
};

export type Observable = RxObservable<Action>;

// TODO: There are no redux-observable flow definitions yet. Therefore, we have
// to use .filter instead of .ofType and
// https://github.com/redux-observable/redux-observable/issues/258
export type Epic = (
  actions$: Observable,
  dependencies: Dependencies,
) => Observable;

// https://www.graph.cool/docs/reference/relay-api/error-management-looxoo7avo/
export type GraphCoolError = Array<{
  code: number,
  locations: Array<Object>,
  message: string,
  path: Array<Object>,
  requestId: string,
}>;

export type Req = {
  ...http$IncomingMessage,
  locale: string,
  localeDataScript: string,
  messages: Object,
  supportedLocales: Array<string>,
};
