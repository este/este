// @flow

// TODO: Use covariants and exact types once Flow fixes them. Should be soon.

import type {
  Dispatch as ReduxDispatch,
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
  Store as ReduxStore,
} from 'redux';

import type { AppState } from '../reducers/app';

export type Id = string;

export type State = {
  app: AppState,
};

export type Action = { type: 'TOGGLE_BASELINE' } | { type: 'TOGGLE_DARK' };

export type Middleware = Array<ReduxMiddleware<State, Action>>;
export type Reducers = { [name: $Keys<State>]: ReduxReducer<State, Action> };
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

// Replace once Relay Modern will have flow-typed typedefs.
export type Environment = Object;

// https://www.graph.cool/docs/reference/relay-api/error-management-looxoo7avo/
export type PayloadError = Array<{
  code: number,
  locations: Array<Object>,
  message: string,
  path: Array<string>,
  requestId: string,
}>;

// export type RelayNetworkError = {
//   name: 'RelayNetwork',
//   source: { errors: Array<{ code: number }> },
// };

export type Req = {
  ...http$IncomingMessage,
  locale: string,
  localeDataScript: string,
  messages: Object,
  supportedLocales: Array<string>,
};
