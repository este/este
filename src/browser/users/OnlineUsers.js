// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import getUserPhotoUrl from '../../common/users/getUserPhotoUrl';
import { Box, Image, Loading, Text } from '../../common/components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { firebase } from '../../common/lib/redux-firebase';
import { onUsersPresence } from '../../common/users/actions';

type OnlineUserProps = {
  user: User,
};

const OnlineUser = ({ user }: OnlineUserProps) => (
  <Image
    marginHorizontal={0.25}
    size={{ height: 50, width: 50 }}
    src={getUserPhotoUrl(user)}
    title={user.displayName}
  />
);

type OnlineUsersProps = {|
  onUsersPresence: typeof onUsersPresence,
  users: Array<User>,
|};

const OnlineUsers = ({ users }: OnlineUsersProps) => (
  users === undefined ?
    <Loading />
  : users === null ?
    <Text>No one is online.</Text>
  :
    <Box flexDirection="row" flexWrap="wrap" marginHorizontal={-0.25}>
      {users.map(user =>
        <OnlineUser key={user.id} user={user} />,
      )}
    </Box>
);

export default compose(
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
