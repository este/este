export const CREATE_ROOM = 'CREATE_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SWITCH_ROOM = 'SWITCH_ROOM';

export const createRoom = room => ({
  type: CREATE_ROOM,
  payload: room,
});

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: message,
});

export const switchRoom = roomId => ({
  type: SWITCH_ROOM,
  roomId,
});
