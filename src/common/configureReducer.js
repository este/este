/* @flow weak */
import app from './app/reducer';
import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import nativeRouting from '../native/routing/reducer';
import todos from './todos/reducer';
import users from './users/reducer';
import { FIREBASE_ON_AUTH } from '../common/lib/redux-firebase/actions';
import { combineReducers } from 'redux';
import { fieldsReducer as fields } from './lib/redux-fields';
import { firebaseReducer as firebase } from './lib/redux-firebase';
import { routerReducer as browserRouting } from 'react-router-redux';
import { updateStateOnStorageLoad } from './configureStorage';

const resetStateOnSignOut = (reducer, initialState) => (state, action) => {
  // Reset app state on sign out, stackoverflow.com/q/35622588/233902.
  const userWasSignedOut =
    action.type === FIREBASE_ON_AUTH &&
    state.users.viewer && !action.payload.user;
  if (userWasSignedOut) {
    // Preserve state without sensitive data.
    state = {
      app: state.app,
      config: initialState.config,
      device: initialState.device,
      intl: initialState.intl,
      routing: state.routing, // Routing state has to be reused.
    };
  }
  return reducer(state, action);
};

const configureReducer = (initialState: Object) => {
  // One day we will have universal routing, but we are not there yet.
  // jmurzy/react-router-native
  const routing = initialState.device.isReactNative
    ? nativeRouting
    : browserRouting;
  let reducer = combineReducers({
    app,
    auth,
    config,
    device,
    fields,
    firebase,
    intl,
    routing,
    todos,
    users,
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOut(reducer, initialState);
  reducer = updateStateOnStorageLoad(reducer);

  return reducer;
};

export default configureReducer;
