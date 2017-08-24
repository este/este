// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import app from '../reducers/app';
import auth from '../reducers/auth';

const createReduxReducer = (platformReducers: Reducers): Reducers =>
  combineReducers({
    ...platformReducers,
    app,
    auth,
  });

export default createReduxReducer;
