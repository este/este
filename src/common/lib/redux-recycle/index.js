// Improved redux-recycle implementation.
// TODO: Wait for fix https://github.com/omnidan/redux-recycle/issues/2
export default function recycle(reducer, actions = [], initialState) {
  return (state, action) => {
    if (actions.indexOf(action.type) >= 0) {
      return reducer(initialState, {type: '@@redux-recycle/INIT'});
    }
    return reducer(state, action);
  };
}
