import {setAuthToken, setIsLoggedIn} from './auth/actions';

export default function runDefaultActions(dispatch, credentialsStore) {
  if (!credentialsStore.get('authToken')) return;

  dispatch(setAuthToken(credentialsStore.get('authToken')));
  dispatch(setIsLoggedIn(true));
}
