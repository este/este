import * as actions from './actions';
import User from './user';
import { Record, Seq } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';

const InitialState = Record({
  // Undefined is absence of evidence. Null is evidence of absence.
  list: undefined,
  viewer: undefined
});

const reviveList = list => list && Seq(list)
  .map(json => new User(json))
  .sortBy(user => -user.authenticatedAt)
  .toList();

const revive = ({ list, viewer }) => new InitialState({
  list: reviveList(list),
  viewer: viewer && new User(viewer)
});

export default function usersReducer(state = new InitialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case firebaseActions.FIREBASE_ON_AUTH: {
      const { user } = action.meta;
      if (!user) return state;
      return state.set('viewer', new User(user));
    }

    case actions.ON_USERS_LIST: {
      const { list } = action.payload;
      return state.set('list', reviveList(list));
    }

  }

  return state;
}
