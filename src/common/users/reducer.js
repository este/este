/* @flow weak */
import * as actions from './actions';
import User from './user';
import { Record } from '../transit';
import { Seq } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';

const State = Record({
  online: null,
  onlineLoaded: false,
  viewer: null,
}, 'users');

const usersReducer = (state = new State(), action) => {
  switch (action.type) {

    case firebaseActions.FIREBASE_ON_AUTH: {
      const { user } = action.payload;
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
