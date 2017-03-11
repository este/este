// @flow
import type { Action, State } from './types';
import app from './app/reducer';
import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import todos from './todos/reducer';
import users from './users/reducer';
import { combineReducers } from 'redux';
import { fieldsReducer as fields } from './lib/redux-fields';

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) =>
  (state: State, action: Action) => {
    const userWasSignedOut = action.type === 'ON_AUTH' &&
      state.users.viewer &&
      !action.payload.firebaseUser;
    if (!userWasSignedOut) {
      return reducer(state, action);
    }
    // Note how we can purge sensitive data without hard reload easily.
    let stateWithoutSensitiveData = {
      app: state.app,
      config: initialState.config,
      device: initialState.device,
      intl: initialState.intl,
    };
    // Preserve Found router reducer.
    if (process.env.IS_BROWSER) {
      stateWithoutSensitiveData = {
        ...stateWithoutSensitiveData,
        found: state.found,
      };
    }
    return reducer(stateWithoutSensitiveData, action);
  };

const configureReducer = (platformReducers: Object, initialState: Object) => {
  // $FlowFixMe
  let reducer = combineReducers({
    ...platformReducers,
    app,
    auth,
    config,
    device,
    fields,
    intl,
    todos,
    users,
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOutReducer(reducer, initialState);

  return reducer;
};

export default configureReducer;
