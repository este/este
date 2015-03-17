import {Map, fromJS} from 'immutable'
import {register} from '../dispatcher'
import {store} from '../state'

const userCursor = store({
  name: 'user',
  create: Map
})

export const dispatchToken = register({
})

export function getUser() {
  return userCursor()
}
