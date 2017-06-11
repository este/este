// @flow
import type { Id, Form, ValidationErrors, AppError } from '../types';
import { reject, isNil, omit } from 'ramda';

// Helpers for Redux forms.

// Not yet submited forms still need own id to save state.
export const addFormId = '';

export const setForm = (state: Form<*>, id: Id, value: ?Object) => ({
  ...state,
  changed: reject(isNil)({ ...state.changed, [id]: value }),
});

export const setFormErrors = (
  state: Form<*>,
  id: Id,
  validationErrors: ?ValidationErrors<*>,
  error: ?AppError
) => ({
  ...state,
  validationErrors: { ...state.validationErrors, [id]: validationErrors },
  error: { ...state.error, [id]: error },
});

export const resetForm = (state: Form<*>, id: Id): Form<*> => ({
  ...state,
  changed: omit([id], state.changed),
  validationErrors: omit([id], state.validationErrors),
  error: omit([id], state.error),
});
