import { combineReducers } from 'redux';
import roomsReducer from './rooms';
import messageReducer from './messages';

export default combineReducers({
  rooms: roomsReducer,
  messages: messageReducer,
});
