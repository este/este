import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { logout } from '../../common/auth/actions';

class Logout extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    const { logout } = this.props;

    return (
      <div className="logout">
        <button onClick={logout}>
          <FormattedMessage {...buttonsMessages.logout} />
        </button>
      </div>
    );
  }

}

export default connect(null, { logout })(Logout);
