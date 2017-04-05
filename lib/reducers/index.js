// @flow
import type { Reducers } from '../../types';
import { combineReducers } from 'redux';

import app from './app';

export default (platformReducers: Reducers) =>
  combineReducers({
    ...platformReducers,
    app,
  });
