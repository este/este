// @flow
import type { Action, State } from '../../types';
import { type Reducer, combineReducers } from 'redux';

import app from '../app/reducer';

export type PlatformReducers = {
  [reducerName: string]: Reducer<State, Action>,
};

const initReducer = (platformReducers: PlatformReducers) =>
  combineReducers({
    ...platformReducers,
    app,
  });

export default initReducer;
