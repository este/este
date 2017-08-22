// @flow
import type { Action, FormState } from '../types';
import { setForm, setFormErrors, disableForm, resetForm } from '../lib/form';

export type AuthFormFields = {|
  email: string,
  password: string,
  signUp: boolean,
|};

export type AuthState = {|
  form: FormState<AuthFormFields>,
|};

const initialState = {
  form: {
    initial: {
      fields: {
        email: '',
        password: '',
        signUp: false,
      },
      disabled: false,
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
