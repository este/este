import messages from './messages';

const initialLocale = 'en';

export default {
  // Each key represents one app feature/store.
  i18n: {
    formats: {},
    locales: initialLocale,
    messages: messages[initialLocale]
  },
  pendingActions: {},
  todos: {
    // New Todo data. Imagine new, not yet saved Todo, is being edited, and
    // changes are persisted on server. Therefore we need to revive it as well.
    newTodo: {
      title: ''
    },
    // Initial state can contain prefetched lists and maps. List for array, map
    // for object. We can also use sortedByTitle list, if we need sorted data.
    list: [
      {id: 1, title: 'Buy a cat'},
      {id: 2, title: 'Create a todo list app', completed: true}
    ]
  }
};
