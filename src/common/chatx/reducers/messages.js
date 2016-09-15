import { Map, fromJS } from 'immutable';
import * as actions from '../actions';


export default (state = new Map(), action) => {
  switch (action.type) {
    case actions.ON_MESSAGES_VALUE: {
      const { roomId, messages } = action.payload;

      const newMessages =
      Object.keys(messages)
        .map((messageId) => {
          const message = messages[messageId];
          message.id = messageId;
          message.roomId = roomId;
          return fromJS(message);
        })
        .reduce((messages, message) => messages.set(message.get('id'), message), new Map());

      return state.merge(newMessages);
    }

    default:
      return state;
  }
};
