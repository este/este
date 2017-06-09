// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import config from './config/reducer';
import users from './users/reducer';

const createReduxReducer = (platformReducers: Reducers): Reducers =>
  combineReducers({
    ...platformReducers,
    config,
    users,
  });

export default createReduxReducer;
