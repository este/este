import { combineReducers } from 'redux';
import roomsReducer from './rooms';
export default combineReducers({
  rooms: roomsReducer,
});
