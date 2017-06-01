// @flow
import type { Id, Form } from '../types';
import { reject, isNil } from 'ramda';

export const reduceForm = (state: Form<Object>, id: Id, value: ?Object) => ({
  ...state,
  // reject(isNil) to remove null values from changedState
  changedState: reject(isNil)({
    ...state.changedState,
    [id]: value,
  }),
});

// TODO: onFormChange somehow aka helper for this. Better typed. PR anyone?
// const onChange = (prop: $Keys<typeof form>) => value => {
//   setUserForm(id, { ...form, [(prop: string)]: value });
// };
