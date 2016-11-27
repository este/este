/* @flow */
import type { Action, UsersState } from '../types';
import R from 'ramda';
import createUserFirebase from './createUserFirebase';

const initialState = {
  // Undefined is absence of evidence, null is evidence of absence.
  online: undefined,
  viewer: undefined,
};

const reducer = (
  state: UsersState = initialState,
  action: Action,
): UsersState => {
  switch (action.type) {

    case 'ON_AUTH': {
      const user = createUserFirebase(action.payload.firebaseUser);
      return { ...state, viewer: user };
    }

    case 'ON_USERS_PRESENCE': {
      const { presence } = action.payload;
      if (!presence) {
        return { ...state, online: null };
      }
      const sortBylastSeenAt = R.sortBy(R.prop('lastSeenAt'));
      const online = R.compose(
        R.map(item => item.user),
        R.sortBy(sortBylastSeenAt),
        R.values,
        R.map(R.compose(R.last, sortBylastSeenAt, R.values)),
      )(presence);
      return { ...state, online };
    }

    default:
      return state;

  }
};

export default reducer;
