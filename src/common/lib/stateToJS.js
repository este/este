export default function stateToJS(state) {
  // Third party reducers can be mutable object without toJS.
  const toJS = key => state[key].toJS
    ? state[key].toJS()
    : state[key];

  return Object.keys(state).reduce((acc, key) => {
    return {...acc, [key]: toJS(key)};
  }, {});
}
