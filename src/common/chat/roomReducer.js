import { Map } from 'immutable';
import { Record } from '../transit';

import * as Actions from './actions';

const RoomState = Record({
  map: Map(),
}, 'rooms');

export const rooms = (state = new RoomState(), action) => {
  switch (action.type) {
    case Actions.CREATE_ROOM: {
      const newRoom = action.payload;
      return state.update('map', map => map.set(newRoom.id, newRoom));
    }

    case Actions.FIREBASE_GET_ROOMS: {
      return state.set('map', action.payload);
    }

    case Actions.SWITCH_ROOM:
      const room = action.room;
      return state.update('map', map => map.set(room.id, room));
    default:
      return state;
  }
};

export const selectedRoom = (state = null, action) => {
  switch (action.type) {
    case Actions.SWITCH_ROOM:
      return action.room;

    case Actions.FIREBASE_GET_ROOMS: {
      if (state) {
        const newSelectedRoom = action.payload.find(room => room.id === state.id);
        console.log(action.payload);
        console.log(newSelectedRoom);
        return newSelectedRoom;
      }
      return state;
    }

    default:
      return state;
  }
};
