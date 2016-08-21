/* @flow weak */
import * as actions from './actions';
import { Record } from '../../common/transit';

const State = Record({
  currentTab: 'home',
}, 'routing');

const routingReducer = (state = new State(), action) => {
  switch (action.type) {

    case actions.NATIVE_ROUTING_SELECT_TAB: {
      const { key } = action.payload;
      return state.set('currentTab', key);
    }

    default:
      return state;

  }
};

export default routingReducer;
