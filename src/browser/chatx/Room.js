import React, { PropTypes } from 'react';
import { Flex, Heading, Space, Tooltip, Badge } from '../app/components';

const Room = ({ room }) => {
  return (
    <Flex>
      <Heading level={5}> {room.name}
        <Space x={1} />
          <Badge
            circle
            rounded
            theme="primary"
          >
            {room.members.size}
          </Badge>
      </Heading>
    </Flex>
  );
};


Room.propTypes = {
  room: PropTypes.object.isRequired,
};

export default Room;
