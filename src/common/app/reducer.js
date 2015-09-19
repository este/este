import {Map} from 'immutable';

import authReducer from '../auth/reducer';
import intlReducer from '../intl/reducer';
import todosReducer from '../todos/reducer';
import usersReducer from '../users/reducer';

export default function appReducer(state, action) {

  // Ensure app state is immutable Map.
  if (!(state instanceof Map)) state = Map(state);

  // .update('device', (s) => deviceStore(s, action))

  // App state consists of feature/domain states.
  state = state
    .update('auth', (s) => authReducer(s, action))
    .update('intl', (s) => intlReducer(s, action))
    .update('todos', (s) => todosReducer(s, action))
    .update('users', (s) => usersReducer(s, action));

  // console.log(state)

  return state;

}

// const deviceInitialState = new (Record({
//   isMobile: false
// }));

// function deviceStore(state, action, payload) {
//   if (action) return state;
//   return deviceInitialState.merge(state);
// }
