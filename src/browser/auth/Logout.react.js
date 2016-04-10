import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { logout } from '../../common/auth/actions';

const messages = defineMessages({
  logout: {
    defaultMessage: 'Logout',
    id: 'auth.logout'
  }
});

class Logout extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    const { logout } = this.props;

    return (
      <div className="logout">
        <button onClick={logout}>
          <FormattedMessage {...messages.logout} />
        </button>
      </div>
    );
  }

}

export default connect(null, { logout })(Logout);
