import React, { Component, PropTypes } from 'react';
import { Seq } from 'immutable';
import { connect } from 'react-redux';
import { firebase } from '../../../common/lib/redux-firebase';

import { Text, View, Box, Card, Heading, Divider } from '../../app/components';

import MessageInput from './MessageInput';
import MessageList from '../components/MessageList';
import OnlineUsers from '../components/OnlineUsers';

import { onGetMessages } from '../../../common/chat/actions';

class ChatRoom extends Component {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    selectedRoom: PropTypes.object.isRequired,
    onGetMessages: PropTypes.func.isRequired,
  };

  getOnlineUsers() {
    if (this.props.selectedRoom && this.props.selectedRoom.onlineUsers) {
      return Seq(this.props.selectedRoom.onlineUsers);
    }
    return Seq();
  }

  render() {
    return (
      <View>
        <Box sm={12} px={3} py={3}>
          <Card p={0}>
            <Box px={2} pt={2}>
              <Heading level={3}>
                {this.props.selectedRoom.name}
              </Heading>
            </Box>
            <Divider my={1} />
            <OnlineUsers users={this.getOnlineUsers()} />
            {
              this.props.messages.size ?
                <MessageList messages={this.props.messages} />
                :
                <Text m={3} small>There is no messages in this room... Say hello !</Text>
            }
            <Divider mb={0}/>
            <MessageInput />
          </Card>
        </Box>
      </View>
    );
  }
}

const getRoomMessages = (messages, selectedRoomId) => {
  if (!selectedRoomId) return {};
  return messages.filter(message => message && message.roomId === selectedRoomId);
};

const mapStateToProps = ({ chat }) => {
  const { messages, rooms, selectedRoomId } = chat;

  const roomMessages = getRoomMessages(messages.map, selectedRoomId);
  const selectedRoom = rooms.map.get(selectedRoomId);

  return {
    messages: roomMessages,
    selectedRoom,
  };
};

const mapDispatchToProps = {
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
