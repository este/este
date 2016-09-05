/* @flow */
import Gravatar from 'react-gravatar';
import React from 'react';
import { Image, Loading, Text, View } from '../app/components';
import { connect } from 'react-redux';
import { onUsersPresence } from '../../common/users/actions';
import { queryFirebase } from '../../common/lib/redux-firebase';

const styles = {
  user: {
    display: 'inline-block',
  },
  gravatar: {
    borderRadius: '25%',
    margin: '.5em',
    maxHeight: 50,
  },
};

const User = ({ user: { displayName, photoURL } }) => (
  <View style={styles.user}>
    {photoURL ?
      <Image
        role="presentation"
        src={photoURL}
        style={styles.gravatar}
        title={displayName}
      />
    :
      <Gravatar
        default="retro"
        email={displayName} // For users signed in via email.
        https
        rating="x"
        style={styles.gravatar}
        title={displayName}
      />
    }
  </View>
);

User.propTypes = {
  user: React.PropTypes.object.isRequired,
};

let OnlineUsers = ({ loaded, users }) => (
  <View>
    {!loaded ?
      <Loading />
    : !users ?
      <Text>No one is online.</Text>
    :
      users.map(user =>
        <User key={user.id} user={user} />
      )
    }
  </View>
);

OnlineUsers.propTypes = {
  users: React.PropTypes.object,
  loaded: React.PropTypes.bool.isRequired,
};

OnlineUsers = queryFirebase(OnlineUsers, ({ onUsersPresence }) => ({
  path: 'users-presence',
  on: { value: onUsersPresence },
}));

export default connect(state => ({
  users: state.users.online,
  loaded: state.users.onlineLoaded,
}), { onUsersPresence })(OnlineUsers);
