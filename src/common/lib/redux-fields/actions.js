/* @flow weak */
export const FIELDS_RESET_FIELDS = 'FIELDS_RESET_FIELDS';
export const FIELDS_SET_FIELD = 'FIELDS_SET_FIELD';

export const resetFields = path => ({
  type: FIELDS_RESET_FIELDS,
  payload: { path },
});

export const setField = (path, value) => ({
  type: FIELDS_SET_FIELD,
  payload: { path, value },
});
