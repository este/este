// @flow
import type { Action, UsersState } from '../types';
import { createTemp } from '../lib/temp';
import { setForm, disableForm, resetForm, setFormErrors } from '../lib/form';
import { reject, isNil, omit } from 'ramda';

const initialState = {
  form: {
    initial: {
      fields: {
        name: '',
        email: '',
        likesCats: false,
        likesDogs: false,
        gender: null,
        isAnarchist: false,
      },
      disabled: createTemp(false),
      appError: null,
      validationErrors: {},
    },
    changed: {},
  },
  local: {},
  selected: {},
  // viewer: null,
};

const reducer = (
  state: UsersState = initialState,
  action: Action,
): UsersState => {
  switch (action.type) {
    case 'SET_USER_FORM':
      return setForm(state, 'form', action.fields, action.id);
    case 'CREATE_USER':
      return disableForm(state, 'form');
    case 'CREATE_USER_ERROR':
      return setFormErrors(state, 'form', action.errors);
    case 'SAVE_USER':
      return disableForm(state, 'form', action.user.id);
    case 'SAVE_USER_ERROR':
      return setFormErrors(state, 'form', action.errors, action.user.id);
    case 'CREATE_USER_SUCCESS': {
      const { user } = action;
      return {
        ...resetForm(state, 'form'),
        local: { ...state.local, [user.id]: user },
      };
    }
    case 'SAVE_USER_SUCCESS': {
      const { user } = action;
      return {
        ...resetForm(state, 'form', user.id),
        local: { ...state.local, [user.id]: user },
      };
    }
    case 'TOGGLE_USERS_SELECTION': {
      const ids = action.users.map(user => user.id);
      const allSelected = ids.every(id => state.selected[id]);
      return {
        ...state,
        selected: reject(isNil)({
          ...state.selected,
          ...ids.reduce(
            (ids, id) => ({ ...ids, [id]: allSelected ? null : true }),
            {},
          ),
        }),
      };
    }
    case 'DELETE_SELECTED_USERS': {
      const ids = Object.keys(state.selected);
      return {
        ...state,
        form: { ...state.form, changed: omit(ids, state.form.changed) },
        local: omit(ids, state.local),
        selected: {},
      };
    }
    default:
      return state;
  }
};

export default reducer;
