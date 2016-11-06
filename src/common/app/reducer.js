import * as actions from './actions';
import { Record } from '../transit';

const State = Record({
  error: null,
  location: null,
  menuShown: false,
  isLoggedIn: false
}, 'app');

const appReducer = (state = new State(), action) => {
  // This is how we can handle all async actions rejections.
  if (action.type.endsWith('_ERROR')) {
    const error = action.payload;
    return state.set('error', error);
  }

  switch (action.type) {
    case actions.TOGGLE_MENU:
      return state.set('menuShown', !state.get('menuShown'));

    case actions.APP_SET_LOCATION:
      return state.set('location', action.payload.location).set('menuShown', false);

    case actions.LOGIN:
      return state.set('isLoggedIn', true);

    case actions.LOGOUT:
      return state.set('isLoggedIn', false);

    default:
      return state;

  }
};

export default appReducer;
