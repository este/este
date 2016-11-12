/* @flow weak */
import app from './app/reducer';
import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import themes from './themes/reducer';
import todos from './todos/reducer';
import users from './users/reducer';
import { combineReducers } from 'redux';
import { fieldsReducer as fields } from './lib/redux-fields';

const resetStateOnSignOut = (reducer, initialState) => (state, action) => {
  // Reset app state on sign out, stackoverflow.com/q/35622588/233902.
  const userWasSignedOut =
    action.type === 'ON_AUTH' && // string because hot reloading
    state.users.viewer &&
    !action.payload.firebaseUser;
  if (userWasSignedOut) {
    // Preserve state without sensitive data.
    state = {
      app: state.app,
      config: initialState.config,
      device: initialState.device,
      intl: initialState.intl,
    };
  }
  return reducer(state, action);
};

const configureReducer = (initialState: Object) => {
  let reducer = combineReducers({
    app,
    auth,
    config,
    device,
    fields,
    intl,
    themes,
    todos,
    users,
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOut(reducer, initialState);

  return reducer;
};

export default configureReducer;
