import React, { PropTypes } from 'react';
import {
  Title,
  View,
  PageHeader,
  Flex,
  Card,
  Box,
  Divider,
} from '../app/components';
import { injectIntl, intlShape } from 'react-intl';
import Rooms from './Rooms';
import NewRoom from './NewRoom';
import ChatRoom from './ChatRoom';
import { connect } from 'react-redux';

let ChatXPage = ({ canLoadChat, openedRoomId }) => (
  <View>
    <Title message="ChatX" />
    <PageHeader heading="A Chat" />
    {canLoadChat ?
      <Flex align="flex-start" justify="space-between">
        <Box col={3}>
          <Card mr={1}>
            <Box px={2} py={2}>
              <Rooms />
            </Box>
            <Divider my={0} />
            <Box px={2} py={2}>
              <NewRoom />
            </Box>
          </Card>
        </Box>
        <Box auto>
          {openedRoomId ?
            <ChatRoom roomId={openedRoomId} />
            :
            <div> Please Open a Rooom</div>
          }

        </Box>
      </Flex>
    :
      <div> Please log in before </div>
  }
  </View>
);

ChatXPage.propTypes = {
  intl: intlShape,
  canLoadChat: PropTypes.bool.isRequired,
  openedRoomId: PropTypes.string.isRequired
};

ChatXPage = connect(state => ({
  canLoadChat: !!state.users.viewer && !!state.chatx.rooms && (state.chatx.rooms.size > 0),
  openedRoomId: state.chatx.openedRoomId,
}))(ChatXPage);

export default injectIntl(ChatXPage);
