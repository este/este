import * as actions from './actions';
import { Record } from '../../common/transit';

const State = Record({
  currentTab: 'home',
}, 'routing');

export default function routingReducer(state = new State, action) {
  switch (action.type) {

    case actions.NATIVE_ROUTING_SELECT_TAB: {
      const { key } = action.payload;
      return state.set('currentTab', key);
    }

  }

  return state;
}
