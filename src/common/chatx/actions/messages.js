import { database } from 'firebase';

export const ON_MESSAGES_VALUE = 'ON_MESSAGES_VALUE';
export const ON_NEW_MESSAGE = 'ON_NEW_MESSAGE';


export const processReceivedMessages = (roomId, messages) => ({
  type: ON_MESSAGES_VALUE,
  payload: { roomId, messages },
});


export const sendMessage = (roomId, me, text) => ({ firebase, dispatch }) => {
  const ref = firebase.child(`rooms-messages/${roomId}`);
  const message = {
    text,
    sentAt: database.ServerValue.TIMESTAMP,
    user: {
      id: me.id,
      displayName: me.displayName,
      photoURL: me.photoURL,
    },
  };
  ref.push(message, () => dispatch({ type: 'MESSAGE_SENT', payload: message }));
  return {
    type: 'MESSAGE_SEND_REQUEST',
    payload: message,
  };
};
