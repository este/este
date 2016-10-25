/* @flow weak */
import * as actions from './actions';
import { Record } from '../transit';

const State = Record({
  formDisabled: false,
  error: null,
}, 'auth');

const authReducer = (state = new State(), action) => {
  switch (action.type) {

    case actions.SIGN_IN:
    case actions.SIGN_UP: {
      return state
        .set('formDisabled', true);
    }

    case actions.SIGN_IN_DONE:
    case actions.SIGN_UP_DONE: {
      return state
        .set('formDisabled', false)
        .set('error', null);
    }

    case actions.SIGN_IN_FAIL:
    case actions.SIGN_UP_FAIL: {
      return state
        .set('formDisabled', false)
        .set('error', action.payload.error);
    }

    default:
      return state;

  }
};

export default authReducer;
