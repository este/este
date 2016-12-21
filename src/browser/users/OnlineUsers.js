/* @flow */
import type { State, User } from '../../common/types';
import R from 'ramda';
import React from 'react';
import getUserPhotoUrl from '../../common/users/getUserPhotoUrl';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { onUsersPresence } from '../../common/users/actions';
import {
  Box,
  Image,
  Loading,
  Text,
} from '../app/components';

type OnlineUserProps = {
  user: User,
};

const OnlineUser = ({ user }: OnlineUserProps) => (
  <Box display="inline-block">
    <Image
      src={getUserPhotoUrl(user)}
      height={50}
      width={50}
      title={user.displayName}
    />
  </Box>
);

type OnlineUsersProps = {|
  onUsersPresence: typeof onUsersPresence,
  users: Array<User>,
|};

const OnlineUsers = ({ users }: OnlineUsersProps) => (
  <Box>
    { users === undefined ?
      <Loading />
    : users === null ?
      <Text>No one is online.</Text>
    :
      users.map(user =>
        <OnlineUser key={user.id} user={user} />,
      )}
  </Box>
);

export default R.compose(
  connect(
    (state: State) => ({
      users: state.users.online,
    }),
    { onUsersPresence },
  ),
  firebase((database, props: OnlineUsersProps) => {
    const usersPresenceRef = database.child('users-presence');
    return [
      [usersPresenceRef, 'on', 'value', props.onUsersPresence],
    ];
  }),
)(OnlineUsers);
