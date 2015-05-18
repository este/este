import * as actions from './actions'
import {appCursor} from '../state'
import {register} from '../dispatcher'

export const dispatchToken = register(({action, data}) => {

  // switch (action) {
  //   case actions.someAppAction:
  //     appCursor(app => {
  //       return app.set...
  //     })
  //     break
  // }

})
