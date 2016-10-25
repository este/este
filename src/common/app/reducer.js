/* @flow weak */
import * as actions from './actions';
import { Record } from '../transit';

const State = Record({
  error: null,
  location: null,
  menuShown: false,
  online: false,
  started: false,
}, 'app');

const appReducer = (state = new State(), action) => {
  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  if (action.type.endsWith('_FAIL')) {
    return state.set('error', action.payload.error);
  }

  switch (action.type) {

    case actions.APP_ERROR:
      return state.set('error', action.payload.error);

    case actions.APP_SET_LOCATION:
      return state.set('location', action.payload.location);

    case actions.APP_SHOW_MENU:
      return state.set('menuShown', action.payload.show);

    case actions.APP_ONLINE:
      return state.set('online', action.payload.online);

    case actions.APP_STARTED:
      return state.set('started', true);

    default:
      return state;

  }
};

export default appReducer;
