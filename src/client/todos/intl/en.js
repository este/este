export default {
  add100: 'Add 100 Todos',
  clearAll: 'Clear All',
  emptyList: 'Nothing. Go outside and enjoy world.',
  newTodoPlaceholder: 'What needs to be done?',
  title: 'Todos',
  toCheck: {
    andMuchMore: '... and much more.',
    header: 'Things to Check',
    isomorphicPage: 'Isomorphic page',
    // This is example how we can localize ordered lists. Keys can be usefull.
    itemListHtml: [
      {
        key: 'source',
        txt: `Server rendered todos, check page source.`
      },
      {
        key: 'development',
        txt: `Try edit styles, components, actions, stores. Everything is hot
              reloadable.`
      },
      {
        key: 'production',
        txt: `Check real app performance and size in production mode (<code>gulp -p</code>)`
      },
      // {
      //   key: 'edit',
      //   txt: `Todos are editable. Click to edit, esc to cancel, enter to save,
      //         everything is safely stored in app state. Try to go elsewhere then
      //         back, note state is preserved.`
      // },
      {
        key: 'globalState',
        txt: `Global immutable app state, have you seen this <a href="https://www.youtube.com/watch?v=5yHFTN-_mOo">
              video</a>? Try <b>ctrl+shift+s</b> to save app state, and
              <b>ctrl+shift+l</b> to load.`
      }
    ]
  },
  undo: `Undo {steps, plural,
    =0 {}
    other {(#)}
  }`
};
