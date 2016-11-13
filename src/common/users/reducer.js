/* @flow weak */
import * as actions from './actions';
import * as authActions from '../auth/actions';
import R from 'ramda';
import createUser from './createUser';
import createUserFirebase from './createUserFirebase';

const initialState = {
  all: {},
  // Undefined is absence of evidence, null is evidence of absence.
  online: undefined,
  viewer: undefined,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {

    case authActions.ON_AUTH: {
      const user = createUserFirebase(action.payload.firebaseUser);
      return { ...state, viewer: user };
    }

    case actions.ON_USERS_PRESENCE: {
      const { presence } = action.payload;
      if (!presence) {
        return { ...state, online: null };
      }
      const sortBylastSeenAt = R.sortBy(R.prop('lastSeenAt'));
      const online = R.compose(
        R.map(item => createUser(item.user)),
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

export default usersReducer;
