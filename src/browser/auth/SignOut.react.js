import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

class SignOut extends Component {

  static propTypes = {
    signOut: PropTypes.func.isRequired,
  };

  render() {
    const { signOut } = this.props;

    return (
      <div className="sign-out">
        <button onClick={signOut}>
          <FormattedMessage {...buttonsMessages.signOut} />
        </button>
      </div>
    );
  }

}

export default connect(null, { signOut })(SignOut);
