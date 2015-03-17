import {Map, fromJS} from 'immutable'
import {register} from '../dispatcher'
import messages from '../messages'
import {store} from '../state'

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
