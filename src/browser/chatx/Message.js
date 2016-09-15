import React from 'react';
import Gravatar from 'react-gravatar';
import {
  Avatar,
  Text,
  Flex,
  Box,
} from '../app/components';


const Message = ({ message }) => {
  const user = message.get('user');
  return (
    <Flex align="center">
      <Box>
        {user.get('photoURL') ?
          <Avatar mr={2} src={user.get('photoURL')} title={user.get('displayName')} />
          :
          <Gravatar
            default="retro"
            style={{ 'margin-right': '4px' }}
            email={user.get('displayName')} // For users signed in via email.
            https
            rating="x"
            title={user.get('displayName')}
          />
        }
      </Box>
      <Box>
        <Text
          small
          bold
          color="midgray"
          children={user.get('displayName')}
        />
        <Text children={message.get('text')} />
      </Box>
    </Flex>
  );
};

Message.propTypes = {
  message: React.PropTypes.object.isRequired,
};

export default Message;
