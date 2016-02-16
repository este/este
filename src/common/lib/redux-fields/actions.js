export const RESET_FIELDS = 'RESET_FIELDS';
export const SET_FIELD = 'SET_FIELD';

export function resetFields(path) {
  return {
    type: RESET_FIELDS,
    payload: {path}
  };
}

export function setField(path, value) {
  return {
    type: SET_FIELD,
    payload: {path, value}
  };
}
