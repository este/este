// @flow
import type { Id, FormState, Errors } from '../types';
import { omit } from 'ramda';
import { createTemp } from './temp';

// Helpers for Redux forms.

export const noFormId = '';

export const setForm = <State: Object, Name: $Keys<State>>(
  state: State,
  name: Name,
  fields: ?Object,
  id: Id = noFormId,
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
  id: Id = noFormId,
): State => {
  const formState: FormState<Object> = state[name];
  const form = formState.changed[id] || formState.initial;
  return {
    ...state,
    [name]: {
      ...formState,
      changed: {
        ...formState.changed,
        [id]: { ...form, disabled: createTemp(true, false) },
      },
    },
  };
};

export const setFormErrors = <State: Object, Name: $Keys<State>>(
  state: State,
  name: Name,
  errors: Errors<Object>,
  id: Id = noFormId,
): State => {
  const formState: FormState<Object> = state[name];
  const form = formState.changed[id] || formState.initial;
  return {
    ...state,
    [name]: {
      ...formState,
      changed: {
        ...formState.changed,
        [id]: { ...form, disabled: createTemp(false), ...errors },
      },
    },
  };
};

export const resetForm = <State: Object, Name: $Keys<State>>(
  state: State,
  name: Name,
  id: Id = noFormId,
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
