// @flow
import type { Action, AuthState } from '../../types';
import { createTemp } from '../temp';
import { setForm, setFormErrors, disableForm, resetForm } from '../form';

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
    case 'SIGN_IN':
      return disableForm(state, 'form');
    case 'SIGN_IN_ERROR':
      return setFormErrors(state, 'form', action.errors);
    case 'SIGN_IN_SUCCESS': {
      return resetForm(state, 'form');
    }
    default:
      return state;
  }
};

export default reducer;
