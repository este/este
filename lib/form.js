// @flow
import type { Id, FormState, Errors } from '../types';
import { omit } from 'ramda';

// Helpers for Redux forms.

export const initialFormId = '';

export const setForm = <State: Object, Name: $Keys<State>>(
  state: State,
  name: Name,
  fields: ?Object,
  id: Id = initialFormId,
): State => {
  const formState: FormState<Object> = state[name];
  if (fields === null)
    return {
      ...state,
      [name]: {
        ...formState,
        changed: omit([id], formState.changed),
      },
    };
  const form = formState.changed[id] || formState.initial;
  return {
    ...state,
    [name]: {
      ...formState,
      changed: {
        ...formState.changed,
        [id]: { ...form, fields },
      },
    },
  };
};

export const disableForm = <State: Object, Name: $Keys<State>>(
  state: State,
  name: Name,
  id: Id = initialFormId,
): State => {
  const formState: FormState<Object> = state[name];
  const form = formState.changed[id] || formState.initial;
  return {
    ...state,
    [name]: {
      ...formState,
      changed: {
        ...formState.changed,
        [id]: { ...form, disabled: true },
      },
    },
  };
};

export const setFormErrors = <State: Object, Name: $Keys<State>>(
  state: State,
  name: Name,
  errors: Errors<Object>,
  id: Id = initialFormId,
): State => {
  const formState: FormState<Object> = state[name];
  const form = formState.changed[id] || formState.initial;
  return {
    ...state,
    [name]: {
      ...formState,
      changed: {
        ...formState.changed,
        [id]: { ...form, disabled: false, ...errors },
      },
    },
  };
};

export const resetForm = <State: Object, Name: $Keys<State>>(
  state: State,
  name: Name,
  id: Id = initialFormId,
): State => {
  const formState: FormState<Object> = state[name];
  return {
    ...state,
    [name]: {
      ...formState,
      changed: omit([id], formState.changed),
    },
  };
};
