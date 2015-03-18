import {Map, fromJS} from 'immutable'
import {register} from '../../lib/dispatcher'
import {store} from '../../lib/state'
import messages from '../messages'

const initialLocale = 'en'

const i18nCursor = store({
  name: 'i18n',
  create: () => Map({
    formats: {},
    locales: initialLocale,
    messages: Map(messages[initialLocale])
  })
})

export const dispatchToken = register({
})

export function getI18n() {
  return i18nCursor()
}
