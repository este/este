import * as actions from './actions';
import {authCursor} from '../state';
import {register} from '../dispatcher';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
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
