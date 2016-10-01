import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MessageList from '../app/components/MessageList';
import UniqueInput from '../app/components/UniqueInput';

import { sendMessage } from '../../common/chat/actions';

class ChatRoom extends Component {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    selectedRoom: PropTypes.object,
  };

  handleMessage = (message) => {
    this.props.sendMessage({
      content: message,
      roomId: this.props.selectedRoom,
    });
  };

  render() {
    return (
      <div>
        {
          this.props.selectedRoom ?
            <div>
              <h2>{this.props.selectedRoom.name}</h2>
              <MessageList messages={this.props.messages} />
              <UniqueInput submit={this.handleMessage} btnLabel="Envoyer" />
            </div>
            :
          'Please select a room'
        }
      </div>
    );
  }
}

const getRoomMessages = (messages, selectedRoom) => {
  return messages.filter(message => message.roomId === selectedRoom);
};

const mapStateToProps = ({ chat }) => {
  const { messages, selectedRoom } = chat;

  const roomMessages = getRoomMessages(messages.map, selectedRoom);
  return {
    messages: roomMessages,
    selectedRoom,
  };
};

const mapDispatchToProps = {
  sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
