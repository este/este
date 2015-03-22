import IntlMessageFormat from 'intl-messageformat'
import Validation from '../lib/validation'
import {i18nCursor} from './state'

class AppValidation extends Validation {

  getRequiredMessage(prop) {
    return getMessage('required', {prop})
  }

  getEmailMessage(prop) {
    return getMessage('email', {prop})
  }

  getSimplePasswordMessage(minLength) {
    return getMessage('password', {minLength})
  }

}

export function validate(object: Object) {
  return new AppValidation(object)
}

function getMessage(messageKey, values) {
  const message = i18nCursor().getIn(['messages', 'validation', messageKey])
  return new IntlMessageFormat(message).format(values)
}
