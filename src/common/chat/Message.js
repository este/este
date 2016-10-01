/* @flow */
import { Record } from '../transit';

const Message = Record({
  id: '',
  content: '',
  roomId: null,
  sentTime: null,
}, 'message');

export default Message;
