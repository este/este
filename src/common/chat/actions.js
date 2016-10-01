import { Map } from 'immutable';

import Message from './Message';
import Room from './Room';

export const CREATE_ROOM = 'CREATE_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SWITCH_ROOM = 'SWITCH_ROOM';
export const FIREBASE_GET_MESSAGES = 'FIREBASE_GET_MESSAGES';
export const FIREBASE_SAVE_MESSAGE = 'FIREBASE_SAVE_MESSAGE';
export const FIREBASE_GET_ROOMS = 'FIREBASE_GET_ROOMS';
export const FIREBASE_SAVE_ROOM= 'FIREBASE_SAVE_ROOM';

export const sendMessage = message => ({ getUid, now, dispatch }) => {

  const newMessage = new Message({
    id: getUid(),
    content: message.content,
    roomId: message.roomId,
    sentTime: now(),
  });

  dispatch(saveMessage(newMessage));
  return {
    type: SEND_MESSAGE,
    payload: newMessage,
  };
};

export const onGetMessages = (snap) => {
  return {
    type: FIREBASE_GET_MESSAGES,
    payload: snap.val(),
  };
};

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

export const switchRoom = room => ({
  type: SWITCH_ROOM,
  room,
});

export const createRoom = roomName => ({ getUid, dispatch }) => {
  const newRoom = new Room({
    id: getUid(),
    name: roomName,
  });

  dispatch(switchRoom(newRoom)); // Maybe too early to dispatch ??
  dispatch(saveRoom(newRoom));

  return {
    type: CREATE_ROOM,
    payload: newRoom,
  };
};

export const onGetRooms = (snap) => ({ dispatch, getState }) => {
  const rooms = Map(snap.val());
  const state = getState();
  const selectedRoom = state.chat.selectedRoom;
  if(!selectedRoom && rooms.sizegulp ) {
    const firstRoom = rooms.first();
    dispatch(switchRoom(firstRoom));
  }
  return {
    type: FIREBASE_GET_ROOMS,
    payload: rooms,
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
