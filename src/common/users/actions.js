export const ON_USERS_PRESENCE = 'ON_USERS_PRESENCE';

export function onUsersPresence(snap) {
  const presence = snap.val();

  return {
    type: ON_USERS_PRESENCE,
    payload: { presence },
  };
}
