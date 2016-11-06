const getActionType = (type, status) => `${type}_${status}`;

function isPromise(value) {
  if (value && typeof value === 'object') {
    return typeof value.then === 'function';
  }

  return false;
}

export const promiseMiddleware = ({ dispatch }) => next => action => {
  // Dispatched empty action
  if (!action) return action;

  // Dispatched promise without type propery (e.g. async function)
  if (isPromise(action)) {
    return dispatch({ type: 'ASYNC_ACTION', payload: action });
  }

  const { type, meta, payload = {} } = action;

  // Dispatched regular action, just pass to the next middleware
  if (!isPromise(payload) && !isPromise(payload.promise)) {
    return next(action);
  }

  // Handle dispatched promises
  const promise = payload.promise || payload;

  const getPartialAction = (status) => ({
    type: getActionType(type, status),
    ...meta ? { meta } : {}
  });

  // Dispatch the pending action
  next(getPartialAction('START'));

  // Promise fulfilled handler
  const handleSuccess = (value) => dispatch({
    ...getPartialAction('SUCCESS'),
    payload: value
  });

  // Promise rejected handler
  const handleError = (error) => dispatch({
    ...getPartialAction('ERROR'),
    payload: error,
    error: true
  });

  return promise.then(handleSuccess).catch(handleError);
};

export default promiseMiddleware;
