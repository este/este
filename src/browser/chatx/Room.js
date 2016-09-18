import React, { PropTypes } from 'react';
import { Flex, Space, Badge, Button, Text, LinkBlock } from '../app/components';

const Room = ({ room, onJoinClicked, onOpenClicked }) => {
  return (
    <Flex align="baseline">
      <LinkBlock is='a' href="javascript:void(0);" onClick={onOpenClicked}>
        <Text children={room.name} />
      </LinkBlock>
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
  onOpenClicked: PropTypes.func.isRequired,
};

export default Room;
