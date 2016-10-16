/* @flow weak */
import app from './app/reducer';
import config from './config/reducer';
import device from './device/reducer';
import themes from './themes/reducer';
import { combineReducers } from 'redux';
import { fieldsReducer as fields } from './lib/redux-fields';

const configureReducer = () =>
  combineReducers({
    app,
    config,
    device,
    fields,
    themes,
  });

export default configureReducer;
