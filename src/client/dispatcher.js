import {Dispatcher} from 'flux'

const dispatcher = new Dispatcher

export function register(handlers:Object):string {
  return dispatcher.register(({action, data}) => {
    const handler:Function = handlers[action]
    if (!handler) return
    handler(data)
  })
}

export function dispatch(action: Function, data: ?Object) {
  if ('production' !== process.env.NODE_ENV) {
    console.log(action) // eslint-disable-line no-console
    if (action.toString === Function.prototype.toString)
      throw new Error('Action toString has to be overridden with dispatcher.setToString.')
  }

  dispatcher.dispatch({action, data})
}
