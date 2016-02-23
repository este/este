export const SET_USERS_LIST = 'SET_USERS_LIST';

export function setUsersList(users) {
  return {
    type: SET_USERS_LIST,
    payload: {users}
  };
}
