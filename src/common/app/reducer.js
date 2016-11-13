/* @flow weak */
import * as actions from './actions';

const initialState = {
  error: null,
  menuShown: false,
  online: false,
  started: false,
};

const appReducer = (state = initialState, action) => {
  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  // TODO: Unify it.
  if (action.type.endsWith('_FAIL')) {
    state = { ...state, error: action.payload.error };
  }

  switch (action.type) {

    case actions.APP_ERROR:
      return { ...state, error: action.payload.error };

    case actions.APP_SHOW_MENU:
      return { ...state, menuShown: action.payload.show };

    case actions.APP_ONLINE:
      return { ...state, online: action.payload.online };

    case actions.APP_STARTED:
      return { ...state, started: true };

    default:
      return state;

  }
};

export default appReducer;
