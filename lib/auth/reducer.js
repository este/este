// @flow
import type { Action, AuthState } from '../../types';
import { createTemp } from '../temp';

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
    default:
      return state;
  }
};

export default reducer;
