// @flow
import type { Action, AuthState } from '../../types';
// import {
//   setForm,
//   disableForm,
//   resetForm,
//   setFormError,
//   noFormId,
// } from '../form';

const initialState = {
  // form: {
  //   initial: {
  //     email: '',
  //     password: '',
  //   },
  //   changed: {},
  //   appError: {},
  //   validationErrors: {},
  //   disabled: {},
  // },
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
