import {combineReducers} from 'redux';

// Reducers
import app from './app/reducer';
import intl from './intl/reducer';
import todos from './todos/reducer';

const rootReducer = combineReducers({
  app,
  intl,
  todos
});

export default rootReducer;
