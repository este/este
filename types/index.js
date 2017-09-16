// @flow
import type {
  Dispatch as ReduxDispatch,
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';

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

// Replace once Relay Modern will have flow-typed typedefs.
export type Environment = Object;

// https://www.graph.cool/docs/reference/relay-api/error-management-looxoo7avo
export type PayloadError = Array<{|
  code: number,
  locations: Array<Object>,
  message: string,
  path: Array<string>,
  requestId: string,
|}>;

export type Commit<Variables, Response> = (
  environment: Environment,
  variables: Variables,
  onCompleted: (response: Response, payloadError: PayloadError) => void,
  onError: (error: any) => void,
) => void;
