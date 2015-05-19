export default {
  en: {
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
        hint: 'Hint: pass1'
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
      title: 'Este.js App'
    },
    me: {
      title: 'Me',
      welcome: `Hi {email}. This is your secret page.`
    },
    notFound: {
      title: 'Page Not Found',
      header: 'This page isn\'t available',
      message: 'The link may be broken, or the page may have been removed.',
      continueMessage: 'Continue here please.'
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
