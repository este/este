export const FIELDS_RESET_FIELDS = 'FIELDS_RESET_FIELDS';
export const FIELDS_SET_FIELD = 'FIELDS_SET_FIELD';

export function resetFields(path) {
  return {
    type: FIELDS_RESET_FIELDS,
    payload: { path }
  };
}

export function setField(path, value) {
  return {
    type: FIELDS_SET_FIELD,
    payload: { path, value }
  };
}
