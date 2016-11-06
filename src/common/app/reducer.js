/* @flow weak */
import * as actions from './actions';
import { Record } from '../transit';

const UsageDetails = Record({
  distanceTravelled: 0,
  averageMileage: 0,
}, 'UsageDetails');

const State = Record({
  error: null,
  menuShown: false,
  online: false,
  started: false,
  UsageDetails: new UsageDetails(),
}, 'app');

const appReducer = (state = new State(), action) => {
  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  if (action.type.endsWith('_FAIL')) {
    state = state.set('error', action.payload.error);
  }

  switch (action.type) {

    case actions.APP_ERROR:
      return state.set('error', action.payload.error);

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
