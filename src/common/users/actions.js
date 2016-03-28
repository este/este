// Note prefix ON_.
// This convention means action is dispatched by server, not by viewer.
export const ON_USERS_LIST = 'ON_USERS_LIST';

export function onUsersList(users) {
  return {
    type: ON_USERS_LIST,
    payload: { users }
  };
}
