import React, { PropTypes } from 'react';

const MessageList = ({ messages }) => {
  const messageList = messages.toList().sortBy(message => message.sentTime);
  return (
    <div>
      <span>Messages:</span>
      <ul>
        {messageList.map(message =>
          <li key={message.id}>{message.content}</li>
        )}
      </ul>
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.object.isRequired,
};

export default MessageList;
