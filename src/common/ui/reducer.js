import * as actions from './actions';
import { Record } from '../transit';

const InitialState = Record({
  isSideMenuOpen: false
}, 'ui');

export default function uiReducer(state = new InitialState, action) {
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
