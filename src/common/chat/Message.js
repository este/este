/* @flow */
import { Record } from '../transit';

const Message = Record({
  id: '',
  content: '',
  roomId: null,
  sentTime: null,
  sender: {},
}, 'message');

export default Message;
