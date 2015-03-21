import {register} from '../dispatcher'
import {userCursor} from '../state'

export const dispatchToken = register(({action, data}) => {
  // switch (action) {
  // }
})

export function getUser() {
  return userCursor()
}
