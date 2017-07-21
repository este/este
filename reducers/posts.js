// @flow
import type { Action, PostsState } from '../types';
import { createTemp } from '../lib/temp';
import {
  setForm,
  // disableForm,
  // resetForm,
  // setFormErrors
} from '../lib/form';
// import { reject, isNil, omit } from 'ramda';

const initialState = {
  form: {
    initial: {
      fields: {
        text: '',
      },
      disabled: createTemp(false),
      appError: null,
      validationErrors: {},
    },
    changed: {},
  },
};

const reducer = (
  state: PostsState = initialState,
  action: Action,
): PostsState => {
  switch (action.type) {
    case 'SET_POST_FORM':
      return setForm(state, 'form', action.fields, action.id);
    // case 'ADD_USER':
    //   return disableForm(state, 'form');
    // case 'ADD_USER_ERROR':
    //   return setFormErrors(state, 'form', action.errors);
    // case 'SAVE_USER':
    //   return disableForm(state, 'form', action.user.id);
    // case 'SAVE_USER_ERROR':
    //   return setFormErrors(state, 'form', action.errors, action.user.id);
    // case 'ADD_USER_SUCCESS': {
    //   const { user } = action;
    //   return {
    //     ...resetForm(state, 'form'),
    //     local: { ...state.local, [user.id]: user },
    //   };
    // }
    // case 'SAVE_USER_SUCCESS': {
    //   const { user } = action;
    //   return {
    //     ...resetForm(state, 'form', user.id),
    //     local: { ...state.local, [user.id]: user },
    //   };
    // }
    default:
      return state;
  }
};

export default reducer;
