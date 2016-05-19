import * as actions from './actions';
import * as authActions from '../auth/actions';
import User from './user';
import { Record, Seq } from 'immutable';
import { firebaseActions, mapAuthToUser } from '../lib/redux-firebase';

const InitialState = Record({
  // Undefined is absence of evidence. Null is evidence of absence.
  list: undefined,
  viewer: undefined
});
const initialState = new InitialState;

const reviveList = list => list && Seq(list)
  .map(json => new User(json))
  .sortBy(user => -user.authenticatedAt)
  .toList();

const revive = ({ list, viewer }) => initialState.merge({
  list: reviveList(list),
  viewer: viewer ? new User(viewer) : null
});

export default function usersReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case authActions.LOGIN_SUCCESS: {
      const { email, id } = action.payload;
      const user = new User({ email, id });
      return state.set('viewer', user);
    }

    case firebaseActions.ESTE_REDUX_FIREBASE_ON_AUTH: {
      const { authData } = action.payload;
      // Handle logout.
      if (!authData) {
        return state.delete('viewer');
      }
      const user = new User(mapAuthToUser(authData));
      return state.set('viewer', user);
    }

    case actions.ON_USERS_LIST: {
      const { list } = action.payload;
      return state.set('list', reviveList(list));
    }

  }

  return state;
}
