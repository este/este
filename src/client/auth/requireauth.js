import {usersCursor} from '../state';

export default function requireAuth(nextState, transition) {
  const isLoggedIn = !!usersCursor().get('viewer');
  if (isLoggedIn) return;

  // TODO this does not work on server side - throw an Error?
  transition.to('/login', {}, {
    nextPath: transition.path
  });
}
