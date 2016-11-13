/* @flow weak */
import * as actions from './actions';

const initialState = {
  currentTheme: null,
};

const themesReducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.SET_THEME: {
      return { ...state, currentTheme: action.payload.theme };
    }

    default:
      return state;

  }
};

export default themesReducer;
