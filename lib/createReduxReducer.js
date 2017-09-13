// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import app from '../reducers/app';

const createReduxReducer = (platformReducers: Reducers): Reducers =>
  combineReducers({
    ...platformReducers,
    app,
  });

export default createReduxReducer;
