// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import app from './app/reducer';

export default (platformReducers: Reducers) =>
  combineReducers({
    ...platformReducers,
    app,
  });
