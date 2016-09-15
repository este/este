/* eslint-disable no-underscore-dangle */

import { EventEmitter } from 'events';
import Promise from 'bluebird';

class ChatXMonitor extends EventEmitter {

  constructor(fiebase, uid) {
    super();
    this.firebase = fiebase;
    this.uid = uid;

    this._roomsMembersListening = {};
  }

  _startListeningToRooms() {
    const ref = this.firebase.child('rooms');
    ref.on('value', (snap) => {
      const rooms = snap.val();
      this.emit('rooms', rooms);

      const roomIds = Object.keys(rooms);
      roomIds.forEach(roomId => this._startListeningToRoomMembers(roomId));
    });
  }

  _startListeningToRoomMembers(roomId) {
    // we are maybe already listening
    if (this._roomsMembersListening[roomId]) return;

    const ref = this.firebase.child(`rooms-members/${roomId}`);
    ref.on('value', (snap) => {
      const members = snap.val() || [];

      // join users info
      Promise
      .map(Object.keys(members), uid =>
           Promise.props({
             uid,
             snap: this.firebase.child(`users/${uid}`).once('value'),
           })
        ).then((members) => {
          members = members.reduce((dict, { uid, snap }) => {
            dict[uid] = snap.val();
            return dict;
          }, {});
          this.emit('room-members', { roomId, members });
        });
    });

    this._roomsMembersListening[roomId] = true;
  }

  start() {
    this._startListeningToRooms();
  }

}

export default ChatXMonitor;
