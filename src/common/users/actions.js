export const ON_USERS_LIST = 'ON_USERS_LIST';

export function onUsersList(list) {
  return {
    type: ON_USERS_LIST,
    payload: { list }
  };
}
