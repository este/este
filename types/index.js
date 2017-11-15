// @flow
import type {
  Dispatch as ReduxDispatch,
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';
import type { Disposable, Environment, PayloadError } from 'react-relay';

import type { AppState } from '../reducers/app';
import type { AppError } from '../lib/appError';

export type Id = string;

export type State = {|
  +app: AppState,
|};

export type Action =
  | AppError
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'TOGGLE_DARK' };

export type Middleware = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { [name: $Keys<State>]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

export type Commit<Variables, Response> = (
  environment: Environment,
  variables: Variables,
  // More typed than flow-typed/npm/react-relay_v1.x.x.js
  onCompleted: (response: Response, errors: ?Array<PayloadError>) => void,
  onError: (error: Error) => void,
) => Disposable;
