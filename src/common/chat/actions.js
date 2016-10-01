export const CREATE_ROOM = 'CREATE_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SWITCH_ROOM = 'SWITCH_ROOM';

let messagesIndex = 2;
let roomIndexes = 2;

export const sendMessage = message => {

  const newMessage = {
    id: (messagesIndex++).toString(),
    content: message.content,
    roomId: message.roomId,
    sentTime: Date.now(),
  };
  return {
    type: SEND_MESSAGE,
    payload: newMessage,
  };
};

export const switchRoom = room => ({
  type: SWITCH_ROOM,
  room,
});

export const createRoom = roomName => ({ dispatch }) => {
  const newRoomIndex = roomIndexes;
  roomIndexes++;

  const newRoom = {
    id: newRoomIndex.toString(),
    name: roomName,
  };

  dispatch(switchRoom(newRoom)); // Maybe too early to dispatch ??

  return {
    type: CREATE_ROOM,
    payload: newRoom,
  };
};
