import dispatcher from '../dispatcher'
import {userCursor} from '../state'

export const dispatchToken = dispatcher.register(({action, data}) => {
  // switch (action) {
  // }
})

export function getUser() {
  return userCursor()
}
