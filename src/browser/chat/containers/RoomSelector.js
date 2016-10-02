import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebase } from '../../../common/lib/redux-firebase';
import { fields } from '../../../common/lib/redux-fields';

import { Button, Select, Flex, Box, Text } from '../../app/components';
import UniqueInput from '../../app/components/UniqueInput';
import { createRoom, switchRoom, onGetRooms } from '../../../common/chat/actions';

class RoomSelector extends Component {
  static propTypes = {
    selectedRoom: PropTypes.object,
    rooms: PropTypes.object.isRequired,
    createRoom: PropTypes.func.isRequired,
    switchRoom: PropTypes.func.isRequired,
    onGetRooms: PropTypes.func.isRequired,
    fields: React.PropTypes.object.isRequired,
  };

  selectRoom() {
    this.props.switchRoom(this.props.fields.selectRoomId.value);
  }

  render() {
    let pickerOptions = this.props.rooms.toList().map(room =>
        ({
          value: room.id,
          children: room.name,
        })
      ).toArray();


    return (
      <div>
        {
          pickerOptions.length ?
            <div>
              <Flex>
                <Box auto>
                  <Select
                    {...this.props.fields.selectRoomId}
                    label="Rooms"
                    options={pickerOptions}
                    rounded
                    hideLabel
                  />
                </Box>
                <Box>
                  <Button onClick={this.selectRoom.bind(this)}>
                    Select room
                  </Button>
                </Box>
              </Flex>
            </div>
            :
            <Text>No rooms</Text>
        }
        <UniqueInput submit={this.props.createRoom} inputLabel="Create a room:" btnLabel="Create" placeholder="Room name" />
      </div>
    );
  }
}

const mapStateToProps = ({ chat }) => {
  const { rooms, selectedRoomId } = chat;

  const selectedRoom = rooms.map.get(selectedRoomId);

  return {
    selectedRoom,
    rooms: rooms.map,
  };
};

const mapDispatchToProps = {
  createRoom,
  switchRoom,
  onGetRooms,
};


RoomSelector = firebase((database, props) => {
  const messagesRef = database.child('rooms');
  return [
    [messagesRef, 'on', 'value', props.onGetRooms],
  ];
  // TODO : get rooms one by one after first initialisation
})(RoomSelector);

RoomSelector = fields(RoomSelector, {
  path: 'roomSelector',
  fields: ['selectRoomId'],
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelector);
