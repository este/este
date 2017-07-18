// @flow
import type { Action, AuthState } from '../types';
import { createTemp } from '../lib/temp';
import { setForm, setFormErrors, disableForm, resetForm } from '../lib/form';

const initialState = {
  form: {
    initial: {
      fields: {
        email: '',
        password: '',
        signUp: false,
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
    case 'AUTH':
      return disableForm(state, 'form');
    case 'AUTH_ERROR':
      return setFormErrors(state, 'form', action.errors);
    case 'AUTH_SUCCESS': {
      return resetForm(state, 'form');
    }
    default:
      return state;
  }
};

export default reducer;
