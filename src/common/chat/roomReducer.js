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
    default:
      return state;
  }
};

export const selectedRoom = (state = null, action) => {
  switch (action.type) {
    case Actions.SWITCH_ROOM:
      return action.room;

    default:
      return state;
  }
};
