// @flow
import type { Id, FormState, Errors } from '../types';
import { reject, isNil, omit } from 'ramda';

// Helpers for Redux forms.

export const newFormId = '';

export const setForm = (state: FormState<*>, id: Id, value: ?Object) => ({
  ...state,
  changed: reject(isNil)({ ...state.changed, [id]: value }),
});

export const setFormError = (
  state: FormState<*>,
  id: Id,
  error: Errors<*>,
) => ({
  ...state,
  appError: { ...state.appError, [id]: error.appError },
  validationErrors: { ...state.validationErrors, [id]: error.validationErrors },
});

export const resetForm = (state: FormState<*>, id: Id): FormState<*> => ({
  ...state,
  changed: omit([id], state.changed),
  appError: omit([id], state.appError),
  validationErrors: omit([id], state.validationErrors),
});
