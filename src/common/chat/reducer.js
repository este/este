import Immutable from 'immutable';
import { combineReducers } from 'redux';

import * as Actions from './actions';

let messagesIndex = 2;

let defaultMessages = Immutable.Map();
defaultMessages = defaultMessages.set('0', {
  id: '0',
  content: 'premier message (1rm)',
  roomId: '0',
  sentTime: Date.now(),
});
defaultMessages = defaultMessages.set('1', {
  id: '1',
  content: 'premier messhage (2rm)',
  roomId: '1',
  sentTime: Date.now(),
});

const messages = (state = defaultMessages, action) => {
  switch (action.type) {
    case Actions.SEND_MESSAGE: {
      const message = {
        id: (messagesIndex++).toString(),
        content: action.payload.content,
        roomId: action.payload.roomId,
        sentTime: Date.now(),
      };
      return state.set(message.id, message);
    }

    default:
      return state;
  }
};

let roomIndexes = 2;
let defaultRooms = Immutable.Map();
defaultRooms = defaultRooms.set('0', {
  id: '0',
  name: 'defaultRoom',
});
defaultRooms = defaultRooms.set('1', {
  id: '1',
  name: 'secondRoom',
});


const rooms = (state = defaultRooms, action) => {
  switch (action.type) {
    case Actions.CREATE_ROOM: {
      const newRoom = {
        id: (roomIndexes++).toString(),
        name: action.payload,
      };
      return state.set(newRoom.id, newRoom);
    }
    default:
      return state;
  }
};

const selectedRoom = (state = '0', action) => {
  switch (action.type) {
    case Actions.SWITCH_ROOM:
      return action.roomId;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messages,
  rooms,
  selectedRoom,
});

export default rootReducer;
