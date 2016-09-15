import { database } from 'firebase';

export const ON_ROOMS_VALUE = 'ON_ROOMS_VALUE';
export const ON_ROOM_MEMBER_VALUE = 'ON_ROOM_MEMBER_VALUE';
export const ROOMS_LISTENING_START = 'ROOMS_LISTENING_START';

export const startListeningToRooms = engine => ({ dispatch }) => {
  engine.on('rooms', (rooms) => {
    dispatch({
      type: ON_ROOMS_VALUE,
      payload: rooms,
    });
  });

  engine.on('room-members', (data) => {
    dispatch({
      type: ON_ROOM_MEMBER_VALUE,
      payload: data,
    });
  });

  return {
    type: ROOMS_LISTENING_START,
  };
};


export const createRoom = roomName => ({ firebase, dispatch }) => {
  firebase.child('rooms').push({
    name: roomName,
    createdAt: database.ServerValue.TIMESTAMP,
  }, () => {
    dispatch({ type: 'ROOM_ADDED' });
  });
  return {
    type: 'ADD_ROOM_REQUEST',
  };
};

export const joinRoom = (myuid, roomId) => ({ firebase, dispatch }) => {
  firebase
    .child(`rooms-members/${roomId}/${myuid}`)
    .set({ joinedAt: database.ServerValue.TIMESTAMP })
    .then(() => dispatch({ type: 'JOINED_ROOM' }));
  return {
    type: 'JOIN_ROOM_REQUEST',
    payload: { myuid, roomId },
  };
};
