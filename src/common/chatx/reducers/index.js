import { combineReducers } from 'redux';
import roomsReducer from './rooms';
import messageReducer from './messages';
import * as actions from '../actions';

export default combineReducers({
  rooms: roomsReducer,
  messages: messageReducer,
  openedRoomId: (state = null, action) => {
    switch (action.type) {
      case actions.ON_ROOM_OPEN: {
        return action.payload;
      }
      default:
        return state;
    }
  },
});
