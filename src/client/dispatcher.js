import {pendingActionsCursor} from './state';
import {Dispatcher} from 'flux';

const dispatcher = new Dispatcher;
const isDev = 'production' !== process.env.NODE_ENV;

export function register(callback: Function): string {
  return dispatcher.register(callback);
}

export function dispatch(action: Function, data: ?Object, options: ?Object) {
  if (isDev && action.toString === Function.prototype.toString)
    throw new Error(`Action ${action} toString method has to be overridden by setToString.`);

  const looksLikePromise = data && typeof data.then === 'function';
  if (looksLikePromise)
    return dispatchAsync(action, data, options);
  else
    dispatchSync(action, data);
}

export function waitFor(ids: Array) {
  dispatcher.waitFor(ids);
}

function dispatchAsync(action: Function, promise: Object, options: ?Object) {
  const actionName = action.toString();

  if (isDev) console.log(`pending ${actionName}`); // eslint-disable-line no-console
  setPending(actionName, true);

  return promise.then(
    (data) => {
      setPending(actionName, false);
      dispatchSync(action, data);
      return data;
    },
    (reason) => {
      if (isDev) console.log(`reject ${actionName}`); // eslint-disable-line no-console
      setPending(actionName, false);
      throw reason;
    }
  );
}

function setPending(actionName, pending) {
  pendingActionsCursor(pendingActions => {
    return pending
      ? pendingActions.set(actionName, true)
      : pendingActions.delete(actionName);
  });
}

function dispatchSync(action: Function, data: ?Object) {
  if (isDev) console.log(action.toString()); // eslint-disable-line no-console
  // if (isDev) console.log(action.toString(), data); // eslint-disable-line no-console
  dispatcher.dispatch({action, data});
}
