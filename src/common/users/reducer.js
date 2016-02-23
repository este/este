import * as actions from './actions';
import * as authActions from '../auth/actions';
import User from './user';
import {Record, Seq} from 'immutable';
import {firebaseActions} from '../lib/redux-firebase';
import {mapAuthToUser} from '../lib/redux-firebase';

const InitialState = Record({
  list: null,
  viewer: null
});
const initialState = new InitialState;

const revive = ({viewer}) => initialState.merge({
  // Handle user authenticated on the server.
  viewer: viewer ? new User(viewer) : null
});

export default function usersReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case authActions.LOGIN_SUCCESS: {
      const {email, id} = action.payload;
      const user = new User({email, id});
      return state.set('viewer', user);
    }

    case firebaseActions.REDUX_FIREBASE_ON_AUTH: {
      const {authData} = action.payload;
      // Handle user logout.
      if (!authData) {
        return state.delete('viewer');
      }
      const user = new User(mapAuthToUser(authData));
      return state.set('viewer', user);
    }

    case actions.SET_USERS_LIST: {
      const {users} = action.payload;
      // TODO: We can reuse current list, merge existing, etc. for better perf.
      const list = Seq(users)
        .map(json => new User(json))
        .sortBy(user => user.authenticatedAt)
        .reverse()
        .toList();
      return state.set('list', list);
    }

  }

  return state;
}
