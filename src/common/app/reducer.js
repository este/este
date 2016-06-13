import * as actions from './actions';
import { Record } from 'immutable';

const InitialState = Record({
  storageLoaded: false
});

export default function appReducer(state = new InitialState, action) {
  if (!(state instanceof InitialState)) return new InitialState(state);

  switch (action.type) {

    case actions.UPDATE_APP_STATE_FROM_STORAGE_ERROR:
    case actions.UPDATE_APP_STATE_FROM_STORAGE_SUCCESS: {
      return state.set('storageLoaded', true);
    }

  }

  return state;
}
