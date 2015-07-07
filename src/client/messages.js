export default {
  en: {
    app: {
      madeByHtml: `made by <a href="https://twitter.com/steida">steida</a>`
    },
    auth: {
      form: {
        button: {
          login: 'Login',
          signup: 'Sign up'
        },
        hint: 'Hint: pass1',
        legend: 'Login / Sign Up',
        placeholder: {
          email: 'your@email.com',
          password: 'password'
        },
        wrongPassword: 'Wrong password'
      },
      logout: {
        button: 'Logout'
      },
      title: 'Login'
    },
    buttons: {
      cancel: 'Cancel',
      edit: 'Edit',
      save: 'Save'
    },
    confirmations: {
      cancelEdit: `You have unsaved changes. Are you sure you want to cancel them?`
    },
    examples: {
      title: 'Examples'
    },
    header: {
      examples: 'Examples',
      h1Html: `<a href="https://github.com/este/este">Este.js</a> App`,
      home: 'Home',
      login: 'Login',
      me: 'Me (protected)',
      todos: 'Todos'
    },
    home: {
      infoHtml: `App starter kit for <a href="https://github.com/este/este">Este.js</a>. Check`,
      title: 'Este.js App',
      todos: 'todos'
    },
    me: {
      title: 'Me',
      welcome: `Hi {email}. This is your secret page.`
    },
    notFound: {
      continueMessage: 'Continue here please.',
      header: 'This page isn\'t available',
      message: 'The link may be broken, or the page may have been removed.',
      title: 'Page Not Found'
    },
    toCheck: {
      andMuchMore: '... and much more.',
      header: 'Things to Check',
      isomorphicPage: 'Isomorphic page',
      itemListHtml: [  // List of language dependent length containing translated messages for React components
        {
          key: 'source',
          txt: `Server rendered todos, view page source.`
        },
        {
          key: 'development',
          txt: `Try edit styles, components, actions, or stores to check
                <a href="https://www.youtube.com/watch?v=pw4fKkyPPg8">live editing</a>
                in development mode (<code>gulp</code>).`
        },
        {
          key: 'production',
          txt: `Check real app performance and size in production mode (<code>gulp -p</code>)`
        },
        {
          key: 'edit',
          txt: `Todos are editable. Click to edit, esc to cancel, enter to save,
                everything is safely saved in global app state. Try to go
                elsewhere then back, note components state is always preserved.`
        },
        {
          key: 'globalState',
          txt: `Global immutable app state, have you seen this <a href="https://www.youtube.com/watch?v=5yHFTN-_mOo">
                video</a>? Try <b>ctrl+shift+s</b> to save current app state,
                and <b>ctrl+shift+l</b> to load.`
        }
      ]
    },
    todos: {
      add100: 'Add 100 Todos',
      clearAll: 'Clear All',
      emptyList: 'Nothing. Go outside and enjoy world.',
      newTodoPlaceholder: 'What needs to be done?',
      title: 'Todos',
      undo: `Undo {steps, plural,
        =0 {}
        other {(#)}
      }`
    },
    validation: {
      email: `Email address is not valid.`,
      password: `Password must contain at least {minLength} characters.`,
      required: `Please fill out {prop, select,
        email {email}
        password {password}
        other {'{prop}'}
      }.`
    }
  }
};
