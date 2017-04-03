// @flow
import type { Reducers } from '../../types';
import { combineReducers } from 'redux';

import app from '../app/reducer';

const initReducer = (platformReducers: Reducers) =>
  combineReducers({
    ...platformReducers,
    app,
  });

export default initReducer;
