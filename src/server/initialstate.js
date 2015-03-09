import config from './config'
import messages from '../client/messages'

let initialLocale = 'en'

export default {
  i18n: {
    formats: {},
    locales: initialLocale,
    messages: messages[initialLocale]
  },
  newTodo: { title: '' },
  todos: [
    {id: 1, title: 'consider ‘stop doing’ app'},
    {id: 2, title: 'relax'}
  ],
  user: {}
}
