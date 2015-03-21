import {register} from '../dispatcher'
import state from '../../lib/state'
import {Record} from 'Immutable'

class User extends Record({
  toString() {
    return 'user'
  }
}) {
  
}

const cursor = state.register(User)

export const dispatchToken = register(({action, data}) => {
  // switch (action) {
  // }
})

export function getUser() {
  return cursor()
}
