import React, { PropTypes } from 'react';
import { Text, Box, Block, Flex, Avatar } from '../../app/components';

const defaultAvatar = 'https://pbs.twimg.com/profile_images/666139404210081792/ef2KOClR_bigger.png';

const Message = ({ message }) => {

  const formatSentTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString();
  };

  return (
    <Block p={2} borderLeft={message.unRead}>
      <Flex align="center">
        <Box>
          <Avatar mr={2} src={message.senderAvatar || defaultAvatar} />
        </Box>
        <Box>
          <Text
            small
            bold
            color="midgray"
          >
            {message.senderName}
          </Text>
          <Text>{message.content}</Text>
          <Text
            small
            color="silver"
          >
            {formatSentTime(message.sentTime)}
          </Text>
        </Box>
      </Flex>
    </Block>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
