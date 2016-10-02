/* @flow */
import React, { PropTypes } from 'react';
import { PageHeader, Title, View } from '../app/components';
import linksMessages from '../../common/app/linksMessages';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';


import ChatRoom from './containers/ChatRoom';
import RoomSelector from './containers/RoomSelector';

const ChatPage = ({ intl, selectedRoomId }) => (
  <View>
    <Title message={linksMessages.chat} />
    <PageHeader heading={intl.formatMessage(linksMessages.chat)} />

    <RoomSelector />
    {selectedRoomId ? <ChatRoom /> : null}
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
