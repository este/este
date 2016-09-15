import React from 'react';
import {
  Title,
  View,
  PageHeader,
  Flex,
  Card,
  Box,
  Block,
  Heading,
  Divider,
} from '../app/components';
import { injectIntl, intlShape } from 'react-intl';
import Rooms from './Rooms';
import NewRoom from './NewRoom';
import ChatRoom from './ChatRoom';
import Message from './Message';
import MessageBox from './MessageBox'
import { connect } from 'react-redux';

let ChatXPage = ({ canLoadChat }) => (
  <View>
    <Title message="ChatX" />
    <PageHeader heading="A Chat" />
  </View>
);

ChatXPage.propTypes = {
  intl: intlShape,
};

export default injectIntl(ChatXPage);
