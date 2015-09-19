// Dependencies middleware detects all actionsCreators that return function
// instead of a Flux Standard Action. In that case, that function is given
// the object of registered dependencies + getState, so it can destruct it and
// use services it needs.
export default function injectDependencies(statics, dynamic = {}) {
  // TODO: Add invariants.
  return ({dispatch, getState}) => next => action => {
    if (typeof action !== 'function') return next(action);
    const dependencies = {...statics};
    Object.keys(dynamic).forEach(key => {
      dependencies[key] = dynamic[key](getState());
    });
    return dispatch(action({...dependencies, getState}));
  };
}
