/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

const SignOut = ({ signOut }) => (
  <div className="sign-out">
    <button onClick={signOut}>
      <FormattedMessage {...buttonsMessages.signOut} />
    </button>
  </div>
);

SignOut.propTypes = {
  signOut: React.PropTypes.func.isRequired,
};

export default connect(null, { signOut })(SignOut);
