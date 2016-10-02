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

    default:
      return state;
  }
};

export const selectedRoomId = (state = null, action) => {
  switch (action.type) {
    // TODO check if room exists : how to access rooms state ?
    case Actions.SWITCH_ROOM:
      return action.roomId;

    default:
      return state;
  }
};
