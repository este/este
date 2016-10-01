import { combineReducers } from 'redux';


import { rooms, selectedRoom } from './roomReducer';
import { messages } from './messageReducer';


const rootReducer = combineReducers({
  messages,
  rooms,
  selectedRoom,
});

export default rootReducer;
