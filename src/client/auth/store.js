import * as actions from './actions';
import {authCursor} from '../state';
import {registerNew, on} from '../dispatcher';

export const dispatchToken = registerNew(authCursor, [

  on(actions.loginError, (data, state) => {
    const error = data;
    return state.setIn(['form', 'error'], error);
  }),

  on(actions.updateFormField, (data, state) => {
    const {name, value} = data;
    return state.setIn(['form', 'fields', name], value);
  }),

  on([actions.updateFormField, actions.loginError], (_, state) => {
    console.log('Woo, multiple actions');
  })

]);
