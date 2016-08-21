/* @flow */
export const ON_USERS_PRESENCE = 'ON_USERS_PRESENCE';

export const onUsersPresence = (snap: Object) => {
  const presence = snap.val();
  return {
    type: ON_USERS_PRESENCE,
    payload: { presence },
  };
};
