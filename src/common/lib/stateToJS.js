import Immutable from 'immutable';

export default function stateToJS(state) {
  return Object.keys(state).filter(v => Immutable.Iterable.isIterable(v)).reduce((acc, key) => {
    return {...acc, [key]: state[key].toJS()};
  }, {});
}
