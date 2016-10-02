import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebase } from '../../../common/lib/redux-firebase';
import { fields } from '../../../common/lib/redux-fields';

import { Text } from '../../app/components';
import { createRoom, switchRoom, onGetRooms } from '../../../common/chat/actions';

import 'react-select/dist/react-select.css';
import SearchSelect from 'react-select';

class RoomSelector extends Component {
  static propTypes = {
    selectedRoom: PropTypes.object,
    rooms: PropTypes.object.isRequired,
    createRoom: PropTypes.func.isRequired,
    switchRoom: PropTypes.func.isRequired,
    onGetRooms: PropTypes.func.isRequired,
    fields: React.PropTypes.object.isRequired,
  };

  selectRoom(item) {
    if (item.label === item.value) { // TODO... On dira rien
      this.props.createRoom(item.label);
    } else {
      this.props.switchRoom(item.value);
    }
  }

  render() {
    const pickerOptions = this.props.rooms.toList().map(room =>
        ({
          value: room.id,
          label: room.name,
          children: room.name,
        })
      ).toArray();


    return (
      <div>
        <Text bold>Rooms</Text>
        <SearchSelect.Creatable
          multi={false}
          options={pickerOptions}
          onChange={this.selectRoom.bind(this)}
          placeholder="Enter a room name..."
          noResultsText="There is no rooms, type to create one !"
          promptTextCreator={label => `Create room "${label}"`}
        />
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
