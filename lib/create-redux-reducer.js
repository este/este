// @flow
import type { Reducers } from '../types';
import { combineReducers } from 'redux';

import app from './app/reducer';
import forms from './forms/reducer';

export default (platformReducers: Reducers) =>
  combineReducers({
    ...platformReducers,
    app,
    forms,
  });
