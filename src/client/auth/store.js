import {authCursor} from '../state';
import * as actions from './actions';
import {register} from '../dispatcher';

export const getForm = () => authCursor(['form']);

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.login:
      authCursor(auth => {
        return resetForm(auth);
      });
      break;

    case actions.loginError:
      authCursor(auth => {
        const error = data;
        return auth.setIn(['form', 'error'], error);
      });
      break;

    case actions.updateFormField:
      authCursor(auth => {
        const {name, value} = data;
        return auth.setIn(['form', 'fields', name], value);
      });
      break;
  }

});

function resetForm(auth) {
  return auth
    .setIn(['form', 'error'], null)
    .setIn(['form', 'fields', 'email'], '')
    .setIn(['form', 'fields', 'password'], '');
}
