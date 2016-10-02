import { combineReducers } from 'redux';


import { rooms, selectedRoomId } from './roomReducer';
import { messages } from './messageReducer';


const rootReducer = combineReducers({
  messages,
  rooms,
  selectedRoomId,
});

export default rootReducer;
