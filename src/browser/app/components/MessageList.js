import React, { PropTypes } from 'react';

const MessageList = ({ messages }) => {
  const messageList = messages.toList().sortBy(message => message.sentTime);
  return (
    <div>
      <span>Messages:</span>
      <ul>
        {messageList.map(message =>
          <li key={message.id}><b>{message.senderName || message.senderId}</b> : <span>{message.content}</span></li>
        )}
      </ul>
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.object.isRequired,
};

export default MessageList;
