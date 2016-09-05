/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Button, View } from '../app/components';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

const SignOut = ({ signOut }) => (
  <View>
    <Button onClick={signOut}>
      <FormattedMessage {...buttonsMessages.signOut} />
    </Button>
  </View>
);

SignOut.propTypes = {
  signOut: React.PropTypes.func.isRequired,
};

export default connect(null, { signOut })(SignOut);
