/* @flow */
import { Record } from '../transit';

const Room = Record({
  id: '',
  name: '',
  onlineUsers: [],
}, 'room');

export default Room;
