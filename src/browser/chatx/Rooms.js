import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { joinRoom, openRoom } from '../../common/chatx/actions';
import Room from './Room';
import { View, Divider } from '../app/components';
import { bindActionCreators } from 'redux';


const Rooms = ( {rooms, myuid, onRoomJoin, onRoomOpen} ) => {
  return (
    <View>
      {rooms.valueSeq().map((room, i) => {
        return (
          <div key={room.id}>
            <Room
              room={room}
              onJoinClicked={() => onRoomJoin(myuid, room.id)}
              onOpenClicked={() => onRoomOpen(room.id)}
            />
            { i !== rooms.size - 1 ? <Divider /> : ''}
          </div>
        );
      }
    )}
    </View>
  );
};

Rooms.propTypes = {
  rooms: PropTypes.object.isRequired,
  onRoomJoin: PropTypes.func.isRequired,
  onRoomOpen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  let rooms = state.chatx.rooms;
  const myuid = state.users.viewer.id;

  rooms = rooms.map(r => r.set('joined', r.members.has(myuid)));
  return {
    rooms,
    myuid
  };
};

const mapDispatchToProps = dispatch => ({
  onRoomJoin: bindActionCreators(joinRoom, dispatch),
  onRoomOpen: bindActionCreators(openRoom, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
