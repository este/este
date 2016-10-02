import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebase } from '../../../common/lib/redux-firebase';

import UniqueInput from '../../app/components/UniqueInput';
import IndexedPicker from '../../app/components/IndexedPicker';
import { createRoom, switchRoom, onGetRooms } from '../../../common/chat/actions';

class RoomSelector extends Component {
  static propTypes = {
    selectedRoom: PropTypes.object,
    rooms: PropTypes.object.isRequired,
    createRoom: PropTypes.func.isRequired,
    switchRoom: PropTypes.func.isRequired,
    onGetRooms: PropTypes.func.isRequired,
  };

  handleChange(roomId) {
    this.props.switchRoom(roomId);
  }

  render() {
    const pickerOptions = this.props.rooms.toList().map(room =>
      ({
        id: room.id,
        value: room.name,
      })
    ).toArray();

    return (
      <div>
        {pickerOptions.length ? <span>Rooms: </span> : null}
        <IndexedPicker
          selectedIndex={(this.props.selectedRoom && this.props.selectedRoom.id) || ''}
          onChange={this.handleChange.bind(this)}
          options={pickerOptions}
        />
        <UniqueInput submit={this.props.createRoom} btnLabel="Créer" placeholder="Room name" />
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelector);
