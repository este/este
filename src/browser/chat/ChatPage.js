/* @flow */
import React from 'react';
import { PageHeader, Title, View } from '../app/components';
import linksMessages from '../../common/app/linksMessages';
import { injectIntl, intlShape } from 'react-intl';


import ChatRoom from './ChatRoom';
import RoomSelector from './RoomSelector';

const ChatPage = ({ intl }) => (
  <View>

    <Title message={linksMessages.chat} />
    <PageHeader heading={intl.formatMessage(linksMessages.chat)} />

    <RoomSelector />
    <ChatRoom />
  </View>
);

ChatPage.propTypes = {
  intl: intlShape,
};

export default injectIntl(ChatPage);
