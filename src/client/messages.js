export default {
  en: {
    auth: {
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
    todos: {
      add100: 'Add 100 Todos',
      clearAll: 'Clear All',
      newTodoPlaceholder: 'What needs to be done?',
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
}
