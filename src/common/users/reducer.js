/* @flow weak */
import * as actions from './actions';
import * as authActions from '../auth/actions';
import User from './user';
import { Record } from '../transit';
import { Seq } from 'immutable';

const State = Record({
  online: null,
  onlineLoaded: false,
  viewer: null,
}, 'users');

const usersReducer = (state = new State(), action) => {
  switch (action.type) {

    case authActions.ON_AUTH: {
      const user = User.fromFirebaseUser(action.payload.firebaseUser);
      return state.set('viewer', user);
    }

    case actions.ON_USERS_PRESENCE: {
      const { presence } = action.payload;
      const online = presence &&
        Seq(presence)
          .map(userPresences => Seq(userPresences)
            .sortBy(userPresence => userPresence.authenticatedAt)
            .last()
          )
          .sortBy(userPresence => userPresence.authenticatedAt)
          .map(userPresence => new User(userPresence.user))
          .toList();
      return state
        .set('online', online)
        .set('onlineLoaded', true);
    }

    default:
      return state;

  }
};

export default usersReducer;
