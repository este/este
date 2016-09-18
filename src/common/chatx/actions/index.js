import { startListeningToRooms } from './rooms';
import ChatXMonitor from '../lib/ChatXMonitor'

export const chatXStart = () => ({ firebase, dispatch }) => {
  const monitor = new ChatXMonitor(firebase, 'foo');
  dispatch(startListeningToRooms(monitor));
  monitor.start();
  return {
    type: 'CHATX_START',
  };
};

export {
  createRoom,
  joinRoom,
  openRoom,
  ON_ROOMS_VALUE,
  ON_ROOM_MEMBER_VALUE,
  ON_ROOM_OPEN,
} from './rooms';


export {
  processReceivedMessages,
  sendMessage,
  ON_MESSAGES_VALUE,
} from './messages';
