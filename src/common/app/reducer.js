import * as actions from './actions';
import { Record } from '../transit';

const InitialState = Record({
  online: false,
  storageLoaded: false,
}, 'app');

export default function appReducer(state = new InitialState, action) {
  switch (action.type) {

    case actions.APP_OFFLINE:
      return state.set('online', false);

    case actions.APP_ONLINE:
      return state.set('online', true);

    case actions.APP_STORAGE_LOAD:
      return state.set('storageLoaded', true);
  }

  return state;
}
