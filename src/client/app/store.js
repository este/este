import immutable from 'immutable';

import authStore from '../auth/store';
import intlStore from '../intl/store';
import todosStore from '../todos/store';
import usersStore from '../users/store';

export default function(state, action, payload) {
  // Create immutable from JSON asap to prevent side effects accidents.
  if (!action) state = immutable.fromJS(state);

  // Btw, this can be refactored, but leaving it explicit for now.
  state = state
    .update('auth', (s) => authStore(s, action, payload))
    .update('intl', (s) => intlStore(s, action, payload))
    .update('todos', (s) => todosStore(s, action, payload))
    .update('users', (s) => usersStore(s, action, payload));

  // We can reduce and compose stores. Note we don't need no waitFor.
  state = state
    // Reduced store.
    .update('msg', (s) => state.get('intl').messages);
    // Composed store example:
    // .update('foo', (s) => fooStore(s, state.get('auth'), action, payload));

  return state;
}
