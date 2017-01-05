// @flow
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';
import {
  Box,
  Button,
} from '../app/components';

type SignOutProps = {
  signOut: typeof signOut,
};

const SignOut = ({ signOut }: SignOutProps, { router }) => {
  const onClick = () => {
    // We have to redirect to home before signOut.
    router.transitionTo({ pathname: '/' });
    setImmediate(signOut);
  };
  return (
    <Box>
      <Button primary onClick={onClick}>
        <FormattedMessage {...buttonsMessages.signOut} />
      </Button>
    </Box>
  );
};

SignOut.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(
  null,
  { signOut },
)(SignOut);
