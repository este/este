import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Room from './Room';
import { View } from '../app/components';

const Rooms = (props) => {
  const rooms = props.rooms;
  return (
    <View>
      {rooms.valueSeq().map(room => <Room key={room.id} room={room} />)}
    </View>
  );
};

Rooms.propTypes = {
  rooms: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ rooms: state.chatx.rooms });

export default connect(mapStateToProps)(Rooms);
