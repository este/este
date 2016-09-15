import React, { PropTypes } from 'react';
import { Flex, Space, Badge, Button, Text } from '../app/components';

const Room = ({ room, onJoinClicked }) => {
  return (
    <Flex align="baseline">
      <Text children={room.name} />
      <Space x={1} />
      <Badge
        circle
        rounded
        theme="primary"
      >
        {room.members.size}
      </Badge>
      <Space auto />
      { room.joined ?
        <Button theme="secondary" disabled>joined</Button>
        :
        <Button theme="primary" onClick={onJoinClicked}>
          join
        </Button>
      }
    </Flex>
  );
};


Room.propTypes = {
  room: PropTypes.object.isRequired,
  onJoinClicked: PropTypes.func.isRequired,
};

export default Room;
