import React, { Component, PropTypes } from 'react';
import { Seq } from 'immutable'
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';

import MessageList from '../app/components/MessageList';
import UniqueInput from '../app/components/UniqueInput';

import { onGetMessages, sendMessage } from '../../common/chat/actions';

class ChatRoom extends Component {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    selectedRoom: PropTypes.object,
    onGetMessages: PropTypes.func.isRequired,
    viewer: PropTypes.object.isRequired,
  };

  handleMessage(message) {
    this.props.sendMessage({
      content: message,
      roomId: this.props.selectedRoom.id,
      sender: this.props.viewer,
    });
  }

  getOnlineUsers() {
    if(this.props.selectedRoom && this.props.selectedRoom.onlineUsers) {
      return Seq(this.props.selectedRoom.onlineUsers).map(user => (
        <li key={user.id}>{user.displayName}</li>
      )).toArray();
    }
    return <li>No users</li>;
  }

  render() {
    return (
      <div>
        {
          this.props.selectedRoom ?
            <div>
              <h2>{this.props.selectedRoom.name}</h2>
              <MessageList messages={this.props.messages} />
              <UniqueInput submit={this.handleMessage.bind(this)} btnLabel="Envoyer" />
            </div>
            :
          'Please select a room'
        }
        <p>Users online on this channel: </p>
        <ul>
          {this.getOnlineUsers()}
        </ul>
      </div>
    );
  }
}

const getRoomMessages = (messages, selectedRoomId) => {
  if (!selectedRoomId) return {};
  return messages.filter(message => message && message.roomId === selectedRoomId);
};

const mapStateToProps = ({ chat, users }) => {
  const { messages, rooms, selectedRoomId } = chat;
  const { viewer } = users;

  const roomMessages = getRoomMessages(messages.map, selectedRoomId);
  const selectedRoom = rooms.map.get(selectedRoomId);

  return {
    messages: roomMessages,
    selectedRoom,
    viewer,
  };
};

const mapDispatchToProps = {
  sendMessage,
  onGetMessages,
};

ChatRoom = firebase((database, props) => {
  const messagesRef = database.child('messages');
  return [
    [messagesRef, 'on', 'value', props.onGetMessages],
  ];
  // TODO : get messages one by one after first initialisation
})(ChatRoom);

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
