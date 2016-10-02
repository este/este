import moment from 'moment';
import React, { PropTypes } from 'react';
import { Text, Box, Block, Flex, Avatar } from '../../app/components';
import Gravatar from 'react-gravatar';

const styles = {
  gravatar: {
    borderRadius: '100%',
    maxHeight: '50px',
    boxSizing: 'border-box',
    maxWidth: 'none',
    width: '48px',
    height: '48px',
    backgroundColor: 'rgb(221, 221, 221)',
    marginRight: '16px',
  },
};

const Message = ({ message }) => {

  const formatSentTime = (time) => {
    const date = moment(time);
    const difference = moment().diff(date);
    const isToday = moment.duration(difference).days() === 0;
    if (isToday) {
      return date.format('H:mm:ss');
    }
    return date.fromNow();
  };

  return (
    <Block m={0} p={2} pt={1} pb={1} borderLeft={message.unRead}>
      <Flex align="center">
        <Box>
          {
            message.sender.photoURL ?
              <Avatar mr={2} src={message.sender.photoURL}/>
              :
              <Gravatar
                size={48}
                default="retro"
                email={message.sender.displayName} // For users signed in via email.
                https
                rating="x"
                style={styles.gravatar}
                title={message.sender.displayName}
              />
          }
        </Box>
        <Box>
          <Text
            small
            bold
            color="midgray"
          >
            {message.sender.displayName}
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
