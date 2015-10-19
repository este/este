import * as actions from './actions';
import Profile from './profile';

import {Map, List, Range, Record} from 'immutable';

const InitialState = Profile;
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = (state) => {
  return initialState.merge(state);
};

export default function profileReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.PROFILE_LOAD_SUCCESS: {
      return state.merge(action.payload);
    }

    case actions.PROFILE_LOAD_ERROR: {
      console.log('profileReducer PROFILE_LOAD_ERROR state', state.toJS());
      console.log('profileReducer PROFILE_LOAD_ERROR action.payload', action.payload);
      return state.set('error', action.payload.error);
    }

  }

  return state;
}
