import config from './config';
import messages from '../client/messages';

export function getInitialState(initialLocale = config.defaultLocale) {
  return {
    $pendingActions: {},
    auth: {
      form: {
        fields: {
          email: '',
          password: ''
        },
        error: null
      }
    },
    i18n: {
      formats: {},
      currentLocale: initialLocale,
      messages: messages
    },
    newTodo: {
      title: ''
    },
    todos: [
      {id: 1, title: 'consider ‘stop doing’ app'},
      {id: 2, title: 'relax'}
    ],
    user: {
      authData: null
    }
  }
}
