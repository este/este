// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import app from './app/reducer';
import users from './users/reducer';

export default (platformReducers: Reducers) =>
  combineReducers({
    ...platformReducers,
    app,
    users,
  });
