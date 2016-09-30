import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import UniqueInput from '../app/components/UniqueInput';
import IndexedPicker from '../app/components/IndexedPicker';
import { createRoom, switchRoom } from '../../common/chat/actions';

class ChatRoom extends Component {
  static propTypes = {
    selectedRoom: PropTypes.string.isRequired,
    rooms: PropTypes.object.isRequired,
    createRoom: PropTypes.func.isRequired,
    switchRoom: PropTypes.func.isRequired,
  };

  createRoom(roomName) {
    this.props.createRoom(roomName);
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
          selectedIndex={this.props.selectedRoom}
          onChange={this.props.switchRoom}
          options={pickerOptions}
        />
        <UniqueInput submit={this.props.createRoom} btnLabel="Créer" />
      </div>
    );
  }
}

const mapStateToProps = ({ chat }) => {
  const { rooms, selectedRoom } = chat;

  return {
    selectedRoom,
    rooms,
  };
};

const mapDispatchToProps = {
  createRoom,
  switchRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
