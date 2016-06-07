import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import todos from './todos/reducer';
import ui from './ui/reducer';
import users from './users/reducer';
import { LOGOUT } from './auth/actions';
import { combineReducers } from 'redux';
import { reduxFields } from './lib/redux-fields';
import { routerReducer as routing } from 'react-router-redux';

const resetOnLogout = (reducer, initialState) => (state, action) => {
  // Reset app state on logout, stackoverflow.com/q/35622588/233902.
  if (action.type === LOGOUT) {
    state = {
      device: initialState.device,
      intl: initialState.intl,
      routing: state.routing // Note routing state has to be reused.
    };
  }
  return reducer(state, action);
};

export default function configureReducer(initialState, platformReducers) {
  let reducer = combineReducers({
    ...platformReducers,
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

  // Higher order reducer.
  reducer = resetOnLogout(reducer, initialState);

  return reducer;
}
