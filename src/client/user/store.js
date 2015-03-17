import {fromJS} from 'immutable'
import {register} from '../dispatcher'
import store from '../store'

const userCursor = store('user', json => json
  ? fromJS(json)
  : Map())

export const dispatchToken = register({
})

export function getUser() {
  return userCursor()
}
