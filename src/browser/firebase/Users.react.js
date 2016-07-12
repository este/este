import './Users.scss';
import * as usersActions from '../../common/users/actions';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import User from './User.react';
import { connect } from 'react-redux';
import { queryFirebase } from '../../common/lib/redux-firebase';

class Users extends Component {

  static propTypes = {
    users: PropTypes.object
  };

  render() {
    const { users } = this.props;

    return (
      <div className="firebase-users">
        {users &&
          <ol>
            {users.map(user =>
              <User key={user.id} user={user} />
            )}
          </ol>
        }
      </div>
    );
  }

}

Users = queryFirebase(Users, props => ({
  path: 'users',
  on: {
    value: snap => props.onUsersList(snap.val())
  }
}));

export default connect(state => ({
  users: state.users.list
}), usersActions)(Users);
