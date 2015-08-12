import Form from './form';
import {Record} from 'immutable';
import {actions} from './actions';

// We can use simple initialState if no data from server need to be revived.
const initialState = new (Record({
  form: new Form
}));

const disableForm = (state, disable) =>
  state.setIn(['form', 'disabled'], disable);

export default function(state = initialState, action, payload) {
  if (!action) return state;

  switch (action) {

  case actions.login:
    return disableForm(state, true);

  case actions.loginSuccess:
  case actions.loginFail:
    return disableForm(state, false).setIn(['form', 'error'], payload);

  case actions.setFormField:
    return state.setIn(['form', 'fields', payload.name], payload.value);

  }

  return state;
}
