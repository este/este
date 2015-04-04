export default {
  en: {
    text: 'English',
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
  },

  fr: {
    text: 'français',
    auth: {
      form: {
        legend: 'se connecter / signer',
        placeholder: {
          email: 'votre@email.com',
          password: 'mot de passe'
        },
        button: {
          login: 'se connecter',
          signup: 'signer'
        },
        hint: 'allusion: pass1'
      },
      logout: {
        button: 'se déconnecter'
      }
    },
    todos: {
      add100: 'ajouter 100 Todos',
      clearAll: 'tout effacer',
      newTodoPlaceholder: 'ce qui dit doit être fait?',
      undo: `annuler {steps, plural,
        =0 {}
        other {(#)}
      }`
    },
    validation: {
      required: `se il vous plaît remplir {prop, select,
        email {email}
        mot de passe {password}
        other {'{prop}'}
      }.`,
      email: `adresse e-mail ne est pas valide`,
      password: `mot de passe doit cotain à bail {minLength} caractères.`
    }
  }

};
