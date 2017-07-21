// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import app from '../reducers/app';
import auth from '../reducers/auth';
import posts from '../reducers/posts';
import users from '../reducers/users';

const createReduxReducer = (platformReducers: Reducers): Reducers =>
  combineReducers({
    ...platformReducers,
    app,
    auth,
    posts,
    users,
  });

export default createReduxReducer;
