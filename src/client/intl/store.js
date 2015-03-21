import {i18nCursor} from '../state'
import {register} from '../dispatcher'

export const dispatchToken = register(({action, data}) => {
  // switch (action) {
  // TODO: Change app locale in runtime.
  // }
})

export function msg(path): string {
  const pathParts = ['messages'].concat(path.split('.'))
  const message = i18nCursor().getIn(pathParts)
  if (message === undefined)
    throw new ReferenceError('Could not find Intl message: ' + path)
  return message
}
