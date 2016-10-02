/* @flow */
import React, { PropTypes } from 'react';
import { SectionHeader, Block, Divider, Title, Text, View } from '../app/components';
import linksMessages from '../../common/app/linksMessages';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';


import ChatRoom from './containers/ChatRoom';
import RoomSelector from './containers/RoomSelector';

const ChatPage = ({ intl, selectedRoomId }) => (
  <View>
    <Title message={linksMessages.chat} />
    <SectionHeader heading={intl.formatMessage(linksMessages.chat)} />

    <RoomSelector />
    <Divider />
    {selectedRoomId ?
      <ChatRoom />
      :
      <Block>
        <Text>Please select or create a room to begin a chat !</Text>
      </Block>
    }
  </View>
);

ChatPage.propTypes = {
  intl: intlShape,
  selectedRoomId: PropTypes.string,
};

const mapStateToProps = ({ chat }) => ({
  selectedRoomId: chat.selectedRoomId,
});

export default connect(mapStateToProps)(injectIntl(ChatPage));
