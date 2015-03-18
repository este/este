import {Map, fromJS} from 'immutable'
import {register} from '../../lib/dispatcher'
import {store} from '../../lib/state'

const userCursor = store({
  name: 'user',
  create: Map
})

export const dispatchToken = register({
})

export function getUser() {
  return userCursor()
}
