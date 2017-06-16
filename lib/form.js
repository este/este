// @flow
import type { Id, FormState, FormError } from '../types';
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
  error: FormError<*>,
) => ({
  ...state,
  validationErrors: { ...state.validationErrors, [id]: error.validationErrors },
  error: { ...state.error, [id]: error.appError },
});

export const resetForm = (state: FormState<*>, id: Id): FormState<*> => ({
  ...state,
  changed: omit([id], state.changed),
  validationErrors: omit([id], state.validationErrors),
  error: omit([id], state.error),
});
