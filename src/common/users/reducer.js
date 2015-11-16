import * as authActions from '../auth/actions';
import * as actions from './actions';
import User from './user';
import {Record} from 'immutable';

const InitialState = Record({
  viewer: null,
});
const initialState = new InitialState;

function revive({viewer, me}) {
  return initialState.merge({
    // Handle user authenticated on the server.
    viewer: viewer ? new User(viewer) : null
  });
}

export default function usersReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case authActions.LOGIN_SUCCESS: {
      const {email} = action.payload;
      return state.set('viewer', new User({email}));
    }

    case actions.FETCH_ME_SUCCESS: {
      return state.set('viewer', new User(action.payload));
    }

  }

  return state;
}
