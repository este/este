import immutable, {Record} from 'immutable';
import {actions} from './actions';

const initialState = new (Record({
  isMenuOpened: false,
  isStatusBarHidden: false,
  statusBarStyle: 'light-content'
}));

const revive = state => initialState.merge(state);

function appStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.toggleStatusBar:
      return state.update('isStatusBarHidden', isHidden => !isHidden);

    case actions.showStatusBar:
      return state.set('isStatusBarHidden', false);

    case actions.hideStatusBar:
      return state.set('isStatusBarHidden', true);

    case actions.toggleMenu:
      return state.update('isMenuOpened', isOpened => !isOpened);

  }

  return state;
}

// Import stores
import todoStore from '../todos/store';
import intlStore from '../intl/store';

export default function registerStores(state = {}, action, payload) {

  if (!action)
    state = immutable.fromJS(state);

  state = state
    .update('app', (s) => appStore(s, action, payload))
    .update('todos', (s) => todoStore(s, action, payload))
    .update('intl', (s) => intlStore(s, action, payload));

  state = state
    .set('msg', state.get('intl').messages);

  return state;

}
