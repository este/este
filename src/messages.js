export default {
  en: {
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
      save: 'Save',
      menu: 'Menu',
      back: 'Back'
    },
    home: {
      title: 'Home',
      text: `App starter kit for Este.js. \n\n
             Open left menu and check todos! \n\n 
             Press CMD+R to reload \n Press CMD+D for debug menu`
    },
    menu: {
      examples: 'Examples',
      home: 'Home',
      login: 'Login',
      me: 'Me (protected)',
      todos: 'Todos',
      link: 'Menu'
    },
    todos: {
      newTodo: {
        placeholder: 'What needs to be done?'
      },
      title: 'Todos',
      list: {
        empty: 'It\'s rather empty here...',
        buttons: {
          add100: 'Add 100 Todos',
          clearCompleted: 'Clear completed',
          clearAll: 'Clear all'
        }
      },
      leftTodos: {
        oneTodo: 'You have almost done',
        todos: 'You have {size} tasks to go!',
        emptyList: 'Nothing, enjoy'
      }
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
  pl: {
    auth: {
      form: {
        button: {
          login: 'Zgłoś się do systemu',
          signup: 'Zarejestruj się'
        },
        hint: 'Wskazówka: pass1',
        legend: 'Zaloguj się / Zarejestruj się',
        placeholder: {
          email: 'your@email.com',
          password: 'hasło'
        },
        wrongPassword: 'Złe hasło'
      },
      logout: {
        button: 'Wyloguj się'
      },
      title: 'Zaloguj się'
    },
    buttons: {
      cancel: 'Anuluj',
      edit: 'Edytuj',
      save: 'Zapisz',
      menu: 'Menu',
      back: 'Wstecz'
    },
    home: {
      title: 'Strona główna',
      text: `Zestaw startowy do Este.js aplikacji. \n\n 
             Otwórz menu po lewej stronie i sprawdź todos! \n\n 
             Naciśnij CMD + R, aby przeładować naciśnij CMD + D by otworzyć menu
             do debuggowania`
    },
    menu: {
      examples: 'Przykłady',
      home: 'Strona główna',
      login: 'Zgłoś się do systemu',
      me: 'Mnie (chronione)',
      todos: 'Todos',
      link: 'Menu'
    },
    todos: {
      newTodo: {
        placeholder: 'Co trzeba zrobić?'
      },
      title: 'Zadania',
      list: {
        empty: 'Trochę tu pusto...',
        buttons: {
          add100: 'Dodaj 100 Todos',
          clearCompleted: 'Wyczyść ukończone',
          clearAll: 'Wyczyść wszystko'
        }
      },
      leftTodos: {
        oneTodo: 'Prawie gotowe',
        todos: 'Pozostało {length} zadań!',
        emptyList: 'Wszystko zrobione'
      }
    },
    validation: {
      email: 'Adres email nie jest prawidłowy.',
      password: 'Hasło musi zawierać co najmniej {minLength} znaków.',
      required: `Prosimy o wypełnienie {prop, select,
        email {email}
        password {password}
        other {\'{prop}\'}`
      }
    }
  }
};
