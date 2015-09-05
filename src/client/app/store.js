import immutable, {Record} from 'immutable';

// Import stores.
import authStore from '../auth/store';
import intlStore from '../intl/store';
import todosStore from '../todos/store';
import usersStore from '../users/store';

const deviceInitialState = new (Record({
  isMobile: false
}));

function deviceStore(state, action, payload) {
  if (action) return state;
  return deviceInitialState.merge(state);
}

export default function appStore(state, action, payload) {
  // Create immutable from JSON asap to prevent side effects accidents.
  if (!action) state = immutable.fromJS(state);

  state = state
    .update('auth', (s) => authStore(s, action, payload))
    .update('device', (s) => deviceStore(s, action, payload))
    .update('intl', (s) => intlStore(s, action, payload))
    .update('todos', (s) => todosStore(s, action, payload))
    .update('users', (s) => usersStore(s, action, payload));

  // Stores can be both reduced and composed.
  state = state
    // Reduce intl store.
    .update('msg', (s) => state.get('intl').messages);
    // Compose new store from auth.
    // .update('foo', (s) => fooStore(s, state.get('auth'), action, payload));

  return state;
}
