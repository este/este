// @flow
import type { Action, UsersState } from '../types';
import createUserFirebase from './createUserFirebase';
import { compose, last, map, prop, sortBy, values } from 'ramda';

const initialState = {
  online: null,
  viewer: null,
};

const reducer = (
  state: UsersState = initialState,
  action: Action,
): UsersState => {
  switch (action.type) {
    case 'SIGN_IN_DONE':
    case 'SIGN_UP_DONE': {
      const { user } = action.payload;
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

    case 'SIGN_OUT': {
      return { ...state, viewer: null };
    }

    default:
      return state;
  }
};

export default reducer;
