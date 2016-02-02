export const DELETE_FIELD = 'DELETE_FIELD';
export const SET_FIELD = 'SET_FIELD';

export function deleteField(path) {
  return {
    type: DELETE_FIELD,
    payload: {path}
  };
}

export function setField(path, value) {
  return {
    type: SET_FIELD,
    payload: {path, value}
  };
}
