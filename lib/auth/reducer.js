// @flow
import type { Action, AuthState } from '../../types';
import { createTemp } from '../temp';
import { setForm /* , disableForm, resetForm, setFormErrors */ } from '../form';

const initialState = {
  form: {
    initial: {
      fields: {
        email: '',
        password: '',
      },
      disabled: createTemp(false),
      appError: null,
      validationErrors: {},
    },
    changed: {},
  },
};

const reducer = (
  state: AuthState = initialState,
  action: Action,
): AuthState => {
  switch (action.type) {
    case 'SET_AUTH_FORM':
      return setForm(state, 'form', action.fields);
    default:
      return state;
  }
};

export default reducer;
