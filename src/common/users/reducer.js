/* @flow */
import type { Action, UsersState } from '../types';
import { sortBy, prop, compose, map, last, values } from 'bundle/ramba';
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
      const sortBylastSeenAt = sortBy(prop('lastSeenAt'));
      const online = compose(
        map(item => item.user),
        sortBy(sortBylastSeenAt),
        values,
        map(compose(last, sortBylastSeenAt, values)),
      )(presence);
      return { ...state, online };
    }

    default:
      return state;

  }
};

export default reducer;
