// @flow
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { Button } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

type SignOutProps = { signOut: typeof signOut };

const SignOut = ({ signOut }: SignOutProps, { router }) => (
  <FormattedMessage {...buttonsMessages.signOut}>
    {message => (
      <Button
        primary
        onPress={() => {
          // We have to redirect to home before signOut.
          router.transitionTo({ pathname: '/' });
          setImmediate(signOut);
        }}
      >
        {message}
      </Button>
    )}
  </FormattedMessage>
);

SignOut.contextTypes = { router: React.PropTypes.object };

export default connect(null, { signOut })(SignOut);
