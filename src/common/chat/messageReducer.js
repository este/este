import { Map } from 'immutable';
import { Record } from '../transit';

import * as Actions from './actions';

import Message from './Message';

const MessageState = Record({
  map: Map(),
}, 'messages');

export const messages = (state = new MessageState(), action) => {
  switch (action.type) {
    case Actions.SEND_MESSAGE: {
      const newMessage = new Message(action.payload);
      return state.update('map', map => map.set(newMessage.id, newMessage));
    }

    default:
      return state;
  }
};
