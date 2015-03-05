import dispatcher from '../dispatcher'
import {userCursor} from '../state'

export const dispatchToken = dispatcher.register((payload) => {
  const {action, data} = payload

  // switch (action) {
  // }

})

export function getUser() {
  return userCursor()
}
