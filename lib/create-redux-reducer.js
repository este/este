// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import app from './reducers/app';

export default (platformReducers: Reducers) =>
  combineReducers({
    ...platformReducers,
    app,
  });
