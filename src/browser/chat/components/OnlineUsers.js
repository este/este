import React, { PropTypes } from 'react';
import { Block } from '../../app/components';

const OnlineUsers = ({ users }) => {

  return (
    <Block>
      {
        users.size ?
          <Block>
            <p>Users online on this channel: </p>
            <ul>
              {
                users.map(user => (
                  <li key={user.id}>{user.displayName}</li>
                )).toArray()
              }
            </ul>
          </Block>
          :
          'Nobody'

      }
    </Block>
  );
};

OnlineUsers.propTypes = {
  users: PropTypes.object.isRequired,
};

export default OnlineUsers;
