import { Map } from 'immutable';

import Message from './Message';
import Room from './Room';

export const CREATE_ROOM = 'CREATE_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SWITCH_ROOM = 'SWITCH_ROOM';
export const FIREBASE_GET_MESSAGES = 'FIREBASE_GET_MESSAGES';
export const FIREBASE_SAVE_MESSAGE = 'FIREBASE_SAVE_MESSAGE';
export const FIREBASE_GET_ROOMS = 'FIREBASE_GET_ROOMS';
export const FIREBASE_SAVE_ROOM = 'FIREBASE_SWITCH_ROOM';
export const FIREBASE_SWITCH_ROOM = 'FIREBASE_SAVE_ROOM';
export const NOTHING = 'NOTHING';

const saveMessage = (message) => ({ firebase }) => {
  const messageToSave = message.toJS();
  const promise = firebase.update({
    [`messages/${message.id}`]: messageToSave,
  });

  return {
    type: FIREBASE_SAVE_MESSAGE,
    payload: promise,
  };
};

export const sendMessage = message => ({ getUid, now, dispatch }) =>
{
  const newMessage = new Message({
    id: getUid(),
    content: message.content,
    roomId: message.roomId,
    sentTime: now(),
    sender: message.sender,
  });

  dispatch(saveMessage(newMessage));
  return {
    type: SEND_MESSAGE,
    payload: newMessage,
  };
};

export const onGetMessages = (snap) => ({
  type: FIREBASE_GET_MESSAGES,
  payload: snap.val(),
});

let lastOnlineRef = null;
export const switchRoom = (roomId) => ({ firebase, getState }) =>
{
  const viewer = getState().users.viewer;

  if (!viewer) return { type: NOTHING };

  const jsViewer = viewer.toJS();

  if (lastOnlineRef) {
    lastOnlineRef.onDisconnect().cancel();
    const deletePromise = lastOnlineRef.remove();
  }

  const onlineUserRef = firebase.child(`rooms/${roomId}/onlineUsers/${jsViewer.id}`);

  const updatePromise = onlineUserRef.set(jsViewer);
  const removeOnDisconnectPromise = onlineUserRef.onDisconnect().remove();

  lastOnlineRef = onlineUserRef;
  return {
    type: SWITCH_ROOM,
    roomId,
  };
};

const saveRoom = (room) => ({ firebase }) => {
  const roomToSave = room.toJS();
  const promise = firebase.update({
    [`rooms/${room.id}`]: roomToSave,
  });

  return {
    type: FIREBASE_SAVE_ROOM,
    payload: promise,
  };
};

export const createRoom = roomName => ({ getUid, dispatch }) => {
  const newRoom = new Room({
    id: getUid(),
    name: roomName,
  });

  dispatch(saveRoom(newRoom));
  setTimeout(() => { // Avant de trouver mieux
    dispatch(switchRoom(newRoom.id)); // Maybe too early to dispatch ??
  }, 500);

  return {
    type: CREATE_ROOM,
    payload: newRoom,
  };
};

export const onGetRooms = (snap) => (
  {
    type: FIREBASE_GET_ROOMS,
    payload: Map(snap.val()),
  }
);
