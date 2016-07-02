import * as actions from './actions';
import User from './user';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';

const InitialState = Record({
  // Undefined is absence of evidence. Null is evidence of absence.
  list: undefined,
  viewer: undefined
}, 'users');

export default function usersReducer(state = new InitialState, action) {
  switch (action.type) {

    case firebaseActions.FIREBASE_ON_AUTH: {
      const { user } = action.meta;
      if (!user) return state;
      return state.set('viewer', new User(user));
    }

    case actions.ON_USERS_LIST: {
      const { list } = action.payload;
      const sortedList = list && Seq(list)
        .map(json => new User(json))
        .sortBy(user => -user.authenticatedAt)
        .toList();
      return state.set('list', sortedList);
    }

  }

  return state;
}
