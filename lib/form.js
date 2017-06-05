// @flow
import type { Id, Form } from '../types';
import { reject, isNil } from 'ramda';

// Helpers for redux forms.

// Not yet saved items still need id to save form state.
export const addFormId = '';

export const reduceForm = (state: Form<Object>, id: Id, value: ?Object) => ({
  ...state,
  // reject(isNil) to remove null values from changedState
  changedState: reject(isNil)({
    ...state.changedState,
    [id]: value,
  }),
});

// TODO: createOnChange, PR anyone? I don't know how to type it correctly.
// It's probably impossible without a lot of boilerplate or $Values proposal.
