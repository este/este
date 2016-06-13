import * as actions from './actions';
import { Record } from 'immutable';

const InitialState = Record({
  isSideMenuOpen: false
});

export default function uiReducer(state = new InitialState, action) {
  if (!(state instanceof InitialState)) return new InitialState(state);

  switch (action.type) {

    case actions.ON_SIDE_MENU_CHANGE: {
      const { isOpen } = action.payload;
      return state.set('isSideMenuOpen', isOpen);
    }

    case actions.TOGGLE_SIDE_MENU:
      return state.update('isSideMenuOpen', isSideMenuOpen => !isSideMenuOpen);

  }

  return state;
}
