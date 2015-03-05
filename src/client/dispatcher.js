import flux from 'flux'
import setToString from '../lib/settostring'

export default new class Dispatcher extends flux.Dispatcher {

  dispatch(action: Function, data: Object) {
    // Here you can log all app actions.
    console.log(action)
    super.dispatch({action, data})
  }

  // Little helper giving action name for logging.
  setToString(prefix, actions) {
    return setToString(prefix, actions)
  }

}
