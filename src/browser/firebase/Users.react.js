import './Users.scss';
import * as usersActions from '../../common/users/actions';
import Component from 'react-pure-render/component';
import Loading from '../lib/Loading.react';
import React, { PropTypes } from 'react';
import UserItem from './UserItem.react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { queryFirebase } from 'este-firebase-redux';

const messages = defineMessages({
  lastLoggedInUsers: {
    defaultMessage: 'Last {limitToLast} Logged In Users',
    id: 'firebase.users.lastLoggedInUsers'
  }
});

class Users extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    limitToLast: PropTypes.number.isRequired,
    users: PropTypes.object
  };

  render() {
    const { limitToLast, users } = this.props;

    return (
      <div className="firebase-users">
        {!users ?
          <Loading />
        :
          <div>
            <h3>
              <FormattedMessage
                {...messages.lastLoggedInUsers}
                values={{ limitToLast }}
              />
            </h3>
            <ol>
              {users.map(user =>
                <UserItem key={user.id} user={user} />
              )}
            </ol>
          </div>
        }
      </div>
    );
  }

}

Users = queryFirebase(Users, props => ({
  // Query path to listen. For one user we can use `users/${props.user.id}`.
  path: 'users',
  // Firebase imperative firebase.com/docs/web/api/query as declarative params.
  params: [
    ['orderByChild', 'authenticatedAt'],
    ['limitToLast', props.limitToLast] // TODO: Enforce via propTypes.
  ],
  on: {
    // Value event always rerenders all users. For better granularity, use
    // child_added, child_changed, child_removed, child_changed events.
    value: snapshot => props.setUsersList(snapshot.val())
  }
}));

Users = injectIntl(Users);

export default connect(state => ({
  users: state.users.list
}), usersActions)(Users);
