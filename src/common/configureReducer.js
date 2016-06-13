import app from './app/reducer';
import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import todos from './todos/reducer';
import ui from './ui/reducer';
import users from './users/reducer';
import { LOGOUT } from './auth/actions';
import { UPDATE_APP_STATE_FROM_STORAGE_SUCCESS } from './app/actions';
import { combineReducers } from 'redux';
import { reduxFields } from './lib/redux-fields';
import { routerReducer as routing } from 'react-router-redux';

// Reset app state on logout, stackoverflow.com/q/35622588/233902.
const resetOnLogout = (reducer, initialState) => (state, action) => {
  if (action.type === LOGOUT) {
    // Delete whole app state except some fixtures and routing state.
    state = {
      device: initialState.device,
      intl: initialState.intl,
      routing: state.routing // Note routing state has to be reused.
    };
  }
  return reducer(state, action);
};

// Update app state from localStorage / AsyncStorage.
const updateAppStateFromStorage = reducer => (state, action) => {
  if (action.type === UPDATE_APP_STATE_FROM_STORAGE_SUCCESS) {
    const appStateFromStorage = action.payload;
    Object.keys(appStateFromStorage).forEach(appFeature => {
      if (!state[appFeature]) return;
      state = {
        ...state,
        [appFeature]: {
          ...state[appFeature].toJS(),
          ...appStateFromStorage[appFeature]
        }
      };
    });
  }
  return reducer(state, action);
};

export default function configureReducer(initialState, platformReducers) {
  let reducer = combineReducers({
    ...platformReducers,
    app,
    auth,
    config,
    device,
    intl,
    reduxFields,
    routing,
    todos,
    ui,
    users
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetOnLogout(reducer, initialState);
  reducer = updateAppStateFromStorage(reducer);

  return reducer;
}
