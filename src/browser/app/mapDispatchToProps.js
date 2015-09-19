import * as authActions from '../../common/auth/actions';
import * as todosActions from '../../common/todos/actions';
import {Map} from 'immutable';
import {bindActionCreators} from 'redux';

const actions = [
  authActions,
  todosActions
];

export default function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch)
  };
}
