/* @flow */
import { Record } from '../transit';

const Message = Record({
  id: '',
  content: '',
  roomId: null,
  sentTime: null,
  senderId: '',
  senderName: '',
}, 'message');

export default Message;
