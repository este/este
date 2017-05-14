// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import app from './app/reducer';
import fields from './fields/reducer';

export default (platformReducers: Reducers) =>
  combineReducers({
    ...platformReducers,
    app,
    fields,
  });
