/* @flow weak */
import * as actions from './actions';

const initialState = {
  formDisabled: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.SIGN_IN:
    case actions.SIGN_UP: {
      return { ...state, formDisabled: true };
    }

    case actions.SIGN_IN_DONE:
    case actions.SIGN_UP_DONE: {
      return { ...state, formDisabled: false, error: null };
    }

    case actions.SIGN_IN_FAIL:
    case actions.SIGN_UP_FAIL: {
      return { ...state, formDisabled: false, error: action.payload.error };
    }

    default:
      return state;

  }
};

export default authReducer;
