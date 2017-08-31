// @flow

// Algebraic data types make domain modelling easy.
// http://blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types

// TODO: Use covariants and exact types once Flow fixes them. Should be soon.

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
};

export type ServerState = {
  app: AppState,
};

export type Action =
  | { type: 'AUTH', fields: AuthFormFields }
  | { type: 'AUTH_ERROR', errors: Errors<AuthFormFields> }
  | { type: 'AUTH_SUCCESS' }
  | { type: 'SET_AUTH_FORM', fields: ?AuthFormFields }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' };

export type Middleware = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { [name: $Keys<State>]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

// Replace once Relay Modern will have flow-typed typedefs.
export type Environment = Object;

export type PlatformDependencies = {
  getEnvironment: () => Environment,
};

export type Dependencies = PlatformDependencies & {
  getState: () => State,
  getNow: () => number,
};

// TODO: Remove
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
