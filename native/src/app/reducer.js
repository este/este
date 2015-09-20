import {Record} from 'immutable';
import * as actions from './actions';

const initialState = new (Record({
  isMenuOpened: false,
  isStatusBarHidden: false,
  statusBarStyle: 'light-content'
}));

export default function appReducer(state = initialState, action) {

  if (!(state instanceof Record)) return initialState.merge(state);

  switch (action.type) {

    case actions.TOGGLE_STATUS_BAR:
      return state.update('isStatusBarHidden', isHidden => !isHidden);

    case actions.SHOW_STATUS_BAR:
      return state.set('isStatusBarHidden', false);

    case actions.HIDE_STATUS_BAR:
      return state.set('isStatusBarHidden', true);

    case actions.TOGGLE_MENU:
      return state.update('isMenuOpened', isOpened => !isOpened);

  }

  return state;

}
