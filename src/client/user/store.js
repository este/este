import dispatcher from '../dispatcher'
import {userCursor} from '../state'

export const dispatchToken = dispatcher.register({
})

export function getUser() {
  return userCursor()
}
