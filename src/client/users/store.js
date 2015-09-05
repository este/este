import User from './user';
import {Record} from 'immutable';
import {actions as authActions} from '../auth/actions';

function revive(state) {
  // Handle case user was authenticated on the server.
  const viewer = state && state.get('viewer');
  return new (Record({
    viewer: viewer ? new User(viewer) : null
  }));
}

export default function usersStore(state, action, payload) {
  if (!action) return revive(state);

  switch (action) {

  case authActions.loginSuccess:
    // Hideous side effect hack, will be removed soon with new react-router.
    User.isLoggedIn = true;
    return state.set('viewer', new User(payload));

  }

  return state;
}
