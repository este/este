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

export default function(state, action, payload) {
  if (!action) state = revive(state);

  switch (action) {

  case authActions.loginSuccess:
    return state.set('viewer', new User({
      email: payload.email,
      password: payload.password,
      isLoggedIn: !!payload
    }));
  }

  return state;
}
