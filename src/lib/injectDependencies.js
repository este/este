export default function injectDependencies(dependencies = {}) {
  return ({dispatch, getState}) => next => action =>
    typeof action === 'function' ?
      dispatch(action({...dependencies, getState})) :
      next(action);
}
