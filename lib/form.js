// @flow
import type { Id, Form, ValidationErrors } from '../types';
import { reject, isNil } from 'ramda';

// Helpers for redux forms.

// Not yet finished forms still need own id to save state.
export const addFormId = '';

export const setForm = (state: Form<*>, id: Id, value: Object) => ({
  ...state,
  changed: { ...state.changed, [id]: value },
});

export const resetForm = (state: Form<*>, id: Id) => ({
  ...state,
  // reject isNil to remove null values
  changed: reject(isNil)({ ...state.changed, [id]: null }),
  errors: reject(isNil)({ ...state.errors, [id]: null }),
});

export const setFormErrors = (
  state: Form<*>,
  id: Id,
  errors: ValidationErrors<*>
) => ({
  ...state,
  errors: { ...state.errors, [id]: errors },
});
