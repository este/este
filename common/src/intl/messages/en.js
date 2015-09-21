export default {
  app: {
    footer: {
      madeByHtml: `made by <a href="https://twitter.com/steida">steida</a>`
    },
    header: {
      h1: `Home`,
      login: 'Login',
      me: 'Me (protected)',
      todos: 'Todos'
    }
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
      wrongPassword: 'Wrong password.'
    },
    logout: {
      button: 'Logout'
    },
    index: {
      title: 'Login'
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
  },
  home: {
    infoHtml: `<a href="https://github.com/este/este">Este.js</a> dev stack.`,
    title: 'Este.js App',
    toCheck: {
      andMuchMore: '... and much more.',
      header: 'Things to Check',
      isomorphicPage: 'Isomorphic page',
      // This is example how we can localize ordered lists.
      itemListHtml: [
        {
          key: 'source',
          txt: `Server rendering.`
        },
        {
          key: 'development',
          txt: `Hot reloadable styles, components, actions, stores, messages.`
        },
        {
          key: 'production',
          txt: `App performance and size in production mode (<code>npm web-start</code>)`
        }
      ]
    }
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
  todos: {
    add100: 'Add 100 Todos',
    clearAll: 'Clear All',
    emptyList: 'Nothing. Go outside and enjoy world.',
    newTodoPlaceholder: 'What needs to be done?',
    title: 'Todos'
  }
};
