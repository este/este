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
      </Box>
    </Flex>
  </View>
);

ChatXPage.propTypes = {
  intl: intlShape,
};

export default injectIntl(ChatXPage);
