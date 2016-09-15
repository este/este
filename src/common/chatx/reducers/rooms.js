import { Map, fromJS } from 'immutable';
import * as actions from '../actions';
import { Record } from '../../transit';

const Room = Record({
  name: null,
  id: null,
  members: Map(),
  joined: null,
}, 'room');


const roomsReducer = (state = new Map(), action) => {
  switch (action.type) {

    case actions.ON_ROOMS_VALUE: {
      const rooms = action.payload;
      const newRooms =
      Object.keys(rooms)
        .map((roomId) => {
          const room = rooms[roomId];
          room.id = roomId;
          room.members = state.getIn([roomId, 'members']) || new Map();
          return new Room(room);
        })
        .reduce((rooms, room) => rooms.set(room.id, room), new Map());

      return state.merge(newRooms);
    }

    case actions.ON_ROOM_MEMBER_VALUE: {
      const { roomId, members } = action.payload;

      let newMembers = Map();
      if (members) {
        newMembers = Object.keys(members)
        .reduce((map, userId) => map.set(userId, fromJS(members[userId])), new Map());
      }

      return state.setIn([roomId, 'members'], newMembers);
    }

    default:
      return state;
  }
};

export default roomsReducer;
