export default {
  en: {
    app: {
      madeByHtml: `made by <a href="https://twitter.com/steida">steida</a>`
    },
    auth: {
      title: 'Login',
      form: {
        legend: 'Login / Sign Up',
        placeholder: {
          email: 'your@email.com',
          password: 'password'
        },
        button: {
          login: 'Login',
          signup: 'Sign up'
        },
        hint: 'Hint: pass1',
        wrongPassword: 'Wrong password'
      },
      logout: {
        button: 'Logout'
      }
    },
    buttons: {
      cancel: 'Cancel',
      edit: 'Edit',
      save: 'Save'
    },
    confirmations: {
      cancelEdit: `You have unsaved changes. Are you sure you want to cancel them?`
    },
    home: {
      title: 'Este.js App',
      infoHtml: `App starter kit for <a href="https://github.com/steida/este">Este.js</a>. Check`,
      todos: 'todos'
    },
    me: {
      title: 'Me',
      welcome: `Hi {email}. This is your secret page.`
    },
    menu: {
      headerHtml: `<a href="https://github.com/steida/este">Este.js</a> App`,
      home: 'Home',
      todos: 'Todos',
      me: 'Me (protected)',
      login: 'Login'
    },
    notFound: {
      title: 'Page Not Found',
      header: 'This page isn\'t available',
      message: 'The link may be broken, or the page may have been removed.',
      continueMessage: 'Continue here please.'
    },
    toCheck: {
      header: 'Things to Check',
      items: {
        source: `View page source, take a look how HTML is server rendered with initial data.`,
        console: `Open console, take a look how actions are logged from <code>src/client/dispatcher.js</code>.`,
        development: `Development mode (<code>gulp</code>), try edit styles or react component to see
            <a href="https://www.youtube.com/watch?v=pw4fKkyPPg8"> live-editing</a> without app reload.`,
        production: `Production mode (<code>gulp -p</code>), to check built app performance and size.`,
        undo: `Undo button. (temporally disabled)`,
        edit: `Edit todo: Click to edit, esc to cancel, enter to save.`,
        globalState: `Global immutable app state, have you seen this <a href="https://www.youtube.com/watch?v=5yHFTN-_mOo">
            video</a>? Try <b>ctrl+shift+s</b> to save app state, and <b>ctrl+shift+l</b> to load.`,
        pureComponent: `<a href="http://facebook.github.io/react/docs/advanced-performance.html">Advanced performance</a>
            with PureComponent. Always use PureComponent and everything will be faster and simpler.`
      },
      isomorphicPage: 'Isomorphic page',
      andMuchMore: '... and much more.'
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
      required: `Please fill out {prop, select,
        email {email}
        password {password}
        other {'{prop}'}
      }.`,
      email: `Email address is not valid.`,
      password: `Password must contain at least {minLength} characters.`
    }
  }
};
