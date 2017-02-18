// @flow
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { Button } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

type SignOutProps = {
  signOut: typeof signOut,
};

const SignOut = ({ signOut }: SignOutProps) => (
  <FormattedMessage {...buttonsMessages.signOut}>
    {message => (
      <Button primary onPress={signOut}>
        {message}
      </Button>
    )}
  </FormattedMessage>
);

export default connect(null, { signOut })(SignOut);
