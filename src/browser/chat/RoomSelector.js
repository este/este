import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import UniqueInput from '../app/components/UniqueInput';
import IndexedPicker from '../app/components/IndexedPicker';
import { createRoom, switchRoom } from '../../common/chat/actions';

class RoomSelector extends Component {
  static propTypes = {
    selectedRoom: PropTypes.object,
    rooms: PropTypes.object.isRequired,
    createRoom: PropTypes.func.isRequired,
    switchRoom: PropTypes.func.isRequired,
  };

  createRoom(roomName) {
    this.props.createRoom(roomName);
  }

  handleChange(roomId) {
    this.props.switchRoom(this.props.rooms.find(room => room.id === roomId));
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
  const { rooms, selectedRoom } = chat;

  return {
    selectedRoom,
    rooms: rooms.map,
  };
};

const mapDispatchToProps = {
  createRoom,
  switchRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelector);
