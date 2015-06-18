import messages from '../client/messages';

const initialLocale = 'en';

export default {
  // Each key represents one app feature/store.
  auth: {
    data: null,
    form: null
  },
  examples: {
    editable: {
      state: null,
      text: 'Some inline-editable text.'
    }
  },
  i18n: {
    formats: {},
    locales: initialLocale,
    messages: messages[initialLocale]
  },
  pendingActions: {},
  todos: {
    editables: {},
    // New Todo data. Imagine new, not yet saved Todo, is being edited, and
    // changes are persisted on server. Therefore we need to revive it as well.
    newTodo: {
      title: ''
    },
    // Initial state can contain prefetched lists and maps. List for array, map
    // for object. We can also use sortedByTitle list, if we need sorted data.
    list: [
      {id: 1, title: 'consider ‘stop doing’ app'}
    ]
  },
  users: {
    // User can be authenticated on server, and then viewer must be defined.
    viewer: null
  }
};
