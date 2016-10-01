import { Map } from 'immutable';
import { Record } from '../transit';

import * as Actions from './actions';

const MessageState = Record({
  map: Map(),
}, 'messages');

export const messages = (state = new MessageState(), action) => {
  switch (action.type) {
    case Actions.SEND_MESSAGE: {
      const message = action.payload;
      return state.update('map', map => map.set(message.id, message));
    }
    case Actions.FIREBASE_SAVE_MESSAGE: {
      return state;
    }
    case Actions.FIREBASE_GET_MESSAGES: {
      const messages = Map(action.payload);
      return state.set('map', messages);
    }

    default:
      return state;
  }
};
