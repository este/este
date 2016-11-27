/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { Button, FormattedMessage } from '../app/components';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

// $FlowFixMe
const SignOut = ({ signOut }, { router }) => {
  const onClick = () => {
    // We have to redirect to home before signOut.
    router.transitionTo({ pathname: '/' });
    // TODO: Router should provide onCompleted callback.
    setImmediate(signOut);
  };
  return (
    <Button onPress={onClick}>
      <FormattedMessage {...buttonsMessages.signOut} />
    </Button>
  );
};

SignOut.propTypes = {
  signOut: React.PropTypes.func.isRequired,
};

SignOut.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(
  null,
  { signOut },
)(SignOut);
