// @flow
import { type Reducer, combineReducers } from 'redux';
import type { Action, State } from './types';

// flow.org/en/docs/types/objects/#toc-objects-as-maps
type PlatformReducers = {
  [reducerName: string]: Reducer<State, Action>,
};

const initReducer = (platformReducers: PlatformReducers) =>
  combineReducers({
    ...platformReducers,
  });

initReducer({
  a: () => ({
    foo: false,
  }),
});

export default initReducer;
