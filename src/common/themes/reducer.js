/* @flow weak */
import * as actions from './actions';
import { Record } from '../transit';

const State = Record({
  currentTheme: null,
}, 'themes');

const themesReducer = (state = new State(), action) => {
  switch (action.type) {

    case actions.SET_THEME: {
      const { theme } = action.payload;
      return state.set('currentTheme', theme);
    }

    default:
      return state;

  }
};

export default themesReducer;
