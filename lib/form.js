// @flow
import type { Id, FormState, Errors } from '../types';
import { reject, isNil, omit } from 'ramda';

// Helpers for Redux forms.

export const newFormId = '';

export const setForm = (
  state: FormState<*>,
  id: Id,
  value: ?Object,
): FormState<*> => ({
  ...state,
  changed: reject(isNil)({ ...state.changed, [id]: value }),
});

export const disableForm = (state: FormState<*>, id: Id): FormState<*> => ({
  ...state,
  disabled: { ...state.disabled, [id]: true },
});

export const setFormError = (
  state: FormState<*>,
  id: Id,
  error: Errors<*>,
): FormState<*> => ({
  ...state,
  appError: { ...state.appError, [id]: error.appError },
  validationErrors: { ...state.validationErrors, [id]: error.validationErrors },
  disabled: omit([id], state.disabled),
});

export const resetForm = (state: FormState<*>, id: Id): FormState<*> => ({
  ...state,
  changed: omit([id], state.changed),
  appError: omit([id], state.appError),
  validationErrors: omit([id], state.validationErrors),
  disabled: omit([id], state.disabled),
});
