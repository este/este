import React from 'react';
import Message from './Message';
import MessageBox from './MessageBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  Box,
  Block,
  Heading,
  Divider,
} from '../app/components';
import { queryFirebase } from '../../common/lib/redux-firebase';
import { processReceivedMessages, sendMessage } from '../../common/chatx/actions';

let ChatRoom = ({ room, me, messages, onNewMessage }) => {
  const onMessageSubmit = text => onNewMessage(room.id, me, text);
  const memberNames = room.members.map(m => m.get('displayName'));
  return (
    <Card p={0}>
      <Box px={2} py={2}>
        <Heading level={3} children={room.get('name')} />
        { room.members.size === 0 ?
          <Heading level={6} children="You are alone in this room :(" />
        :
          <Heading level={6} children={`with: ${memberNames.join(', ')}`} />
        }
      </Box>
      {messages.valueSeq().map((message, i) =>
        <Block p={2} borderLeft key={i}>
          <Message message={message} />
        </Block>
      )}
      <Divider my={0} />
      <Box px={2} py={2}>
        <MessageBox onNewMessage={onMessageSubmit} />
      </Box>
    </Card>
  );
};

ChatRoom.propTypes = {
  room: React.PropTypes.object.isRequired,
  messages: React.PropTypes.object.isRequired,
  me: React.PropTypes.object.isRequired,
  onNewMessage: React.PropTypes.func.isRequired,
};

ChatRoom = queryFirebase(ChatRoom, ({ roomId, onMessagesReceived }) => ({
  path: `rooms-messages/${roomId}`,
  on: { value: snap => onMessagesReceived(roomId, snap.val()) },
  params: [
    ['limitToFirst', 10],
  ],
}));


const mapStateToProps = (state, { roomId }) => {

  // could also use reselect
  const messages = state.chatx.messages.filter(v => v.get('roomId') === roomId);

  return {
    room: state.chatx.rooms.get(roomId),
    messages,
    me: state.users.viewer,
  };
};

const mapDispatchToProps = (dispatch, { roomId, me }) => ({
  onNewMessage: bindActionCreators(sendMessage, dispatch),
  onMessagesReceived: bindActionCreators(processReceivedMessages, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
