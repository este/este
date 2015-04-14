// import config from './config';
import messages from '../client/messages';

const initialLocale = 'en';

export default {
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
    locales: initialLocale,
    messages: messages[initialLocale]
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
};
